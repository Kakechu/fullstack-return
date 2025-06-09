import { useState, useEffect, useRef } from 'react'

import blogService from './services/blogs'
import loginService from './services/login'

import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import Users from './components/Users'
import User from './components/User'
import BlogDetails from './components/BlogDetails'
import LoginForm from './components/LoginForm'

import { useDispatch, useSelector } from 'react-redux'
import { setNotification } from './reducers/notificationReducer'
import { initializeBlogs, appendBlog } from './reducers/blogReducer'
import { setUser } from './reducers/userReducer'

import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'

import {
  AppBar,
  Container,
  Toolbar,
  IconButton,
  Button,
  Box,
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Typography,
  Paper,
} from '@mui/material'

const App = () => {
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

  const handleLogOut = async (event) => {
    dispatch(setUser(null))
    window.localStorage.removeItem('loggedBlogappUser')
  }

  const sortedBlogs = [...blogs].sort(function (a, b) {
    return b.likes - a.likes
  })

  if (user === null) {
    return <LoginForm />
  }

  const padding = {
    padding: 5,
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const BlogList = () => (
    <div>
      <Typography variant="h4" sx={{ margin: 2 }}>
        blog app
      </Typography>
      <Notification />
      <Togglable buttonLabel="create new blog" ref={blogFormRef}>
        <BlogForm createBlog={addBlog} />
      </Togglable>
      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            {sortedBlogs.map((blog) => (
              <TableRow key={blog.id}>
                <TableCell>
                  <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
                </TableCell>
                <TableCell>{blog.author}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )

  return (
    <Container>
      <Router>
        <AppBar position="static" color="primary">
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
            ></IconButton>
            <Button color="inherit" component={Link} to="/">
              blogs
            </Button>
            <Button color="inherit" component={Link} to="/users">
              users
            </Button>
            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ marginRight: 2 }}>{user.name} logged in</Box>
            <Button color="inherit" onClick={handleLogOut}>
              logout
            </Button>
          </Toolbar>
        </AppBar>

        <Routes>
          <Route path="/" element={<BlogList />} />
          <Route path="/users" element={<Users />} />
          <Route path="/users/:id" element={<User />} />
          <Route path="/blogs/:id" element={<BlogDetails />} />
        </Routes>
      </Router>
    </Container>
  )
}

export default App
