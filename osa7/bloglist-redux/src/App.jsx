import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

import { useDispatch, useSelector } from 'react-redux'
import { setNotification } from './reducers/notificationReducer'
import {
  initializeBlogs,
  appendBlog,
  updateBlog,
  setBlogs,
} from './reducers/blogReducer'
import { setUser } from './reducers/userReducer'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()

  const blogFormRef = useRef()

  const blogs = useSelector((state) => state.blogs)
  const user = useSelector((state) => state.user)

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
      blogService.setToken(user.token)
    }
  }, [])

  const addBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility()

    try {
      const returnedBlog = await blogService.create(blogObject)

      const returnedBlogWithUser = {
        ...returnedBlog,
        user: user,
      }

      dispatch(appendBlog(returnedBlogWithUser))
      dispatch(
        setNotification({
          text: `a new blog ${blogObject.title} by ${blogObject.author} added`,
          type: 'success',
        }),
      )
    } catch (exception) {
      console.log('error creating blog', exception)
    }
  }

  const handleLike = async (blogId, newBlog) => {
    const original = blogs.find((b) => b.id === blogId)

    try {
      const returnedBlog = await blogService.update(blogId, newBlog)

      const blogWithUser = {
        ...returnedBlog,
        user: original.user,
      }
      dispatch(updateBlog(blogWithUser))
    } catch (exception) {
      console.log('error liking', exception)
    }
  }

  const handleRemove = async (blog) => {
    try {
      await blogService.removeBlog(blog.id)
      dispatch(setBlogs(blogs.filter((b) => b.id !== blog.id)))
      dispatch(
        setNotification({
          text: `blog ${blog.title} removed`,
          type: 'success',
        }),
      )
    } catch (exception) {
      console.log('error in deletion', exception)
      dispatch(
        setNotification({
          text: `cannot remove blog ${blog.title} `,
          type: 'error',
        }),
      )
    }
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username,
        password,
      })

      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))

      blogService.setToken(user.token)
      dispatch(setUser(user))
      setUsername('')
      setPassword('')
    } catch (exception) {
      console.log('wrong credentials')
      dispatch(
        setNotification({ text: 'wrong username or password', type: 'error' }),
      )
    }
  }

  const handleLogOut = async (event) => {
    dispatch(setUser(null))
    window.localStorage.removeItem('loggedBlogappUser')
  }

  const sortedBlogs = [...blogs].sort(function (a, b) {
    return b.likes - a.likes
  })

  const loginForm = () => (
    <div>
      <h2>Log in to application</h2>
      <Notification />
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            data-testid="username"
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            data-testid="password"
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )

  if (user === null) {
    return loginForm()
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification />
      <p>
        {user.name} logged in <button onClick={handleLogOut}>logout</button>
      </p>
      <Togglable buttonLabel="create new blog" ref={blogFormRef}>
        <BlogForm createBlog={addBlog} />
      </Togglable>
      {sortedBlogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          handleLike={handleLike}
          handleRemove={handleRemove}
          user={user}
        />
      ))}
    </div>
  )
}

export default App
