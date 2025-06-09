import { useParams, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import blogService from '../services/blogs'
import { setBlogs, updateBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'

const BlogDetails = () => {
  const { id } = useParams()
  const blogs = useSelector((state) => state.blogs)
  const blog = blogs.find((b) => b.id === id)

  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  if (!blog) {
    return null
  }

  const onLike = async () => {
    const newBlog = {
      ...blog,
      likes: blog.likes + 1,
    }

    try {
      const returnedBlog = await blogService.update(blog.id, newBlog)

      const blogWithUser = {
        ...returnedBlog,
        user: blog.user,
      }
      dispatch(updateBlog(blogWithUser))
    } catch (exception) {
      console.log('error liking', exception)
    }
  }

  const onRemove = async () => {
    if (confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      try {
        await blogService.removeBlog(blog.id)
        dispatch(setBlogs(blogs.filter((b) => b.id != blog.id)))
        dispatch(
          setNotification({
            text: `blog ${blog.title} removed`,
            type: 'success',
          }),
        )
        navigate('/')
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
  }

  const removeButton = () => (
    <div>
      <button style={{ backgroundColor: '#24A0ED' }} onClick={() => onRemove()}>
        remove
      </button>
    </div>
  )

  const blogDetails = () => (
    <div className="blogDetails">
      <h1>
        {blog.title} {blog.author}
      </h1>
      <a href={blog.url}>{blog.url}</a>
      <div>
        likes {blog.likes}
        <button onClick={() => onLike()}>like</button>
      </div>
      <div>added by {blog.user.name}</div>
    </div>
  )

  if (user.username === blog.user?.username) {
    return (
      <div className="blog">
        {blogDetails()}
        {removeButton()}
      </div>
    )
  }

  return <div className="blog">{blogDetails()}</div>
}

export default BlogDetails
