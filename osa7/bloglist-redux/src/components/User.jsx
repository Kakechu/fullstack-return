import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { List, ListItem } from '@mui/material'

const User = () => {
  const { id } = useParams()
  const users = useSelector((state) => state.users)
  const user = users.find((u) => u.id === id)
  if (!user) {
    return null
  }

  return (
    <div>
      <h1>{user.name}</h1>
      <h2>added blogs</h2>
      <List>
        {user.blogs.map((blog) => (
          <ListItem key={blog.id}>{blog.title}</ListItem>
        ))}
      </List>
    </div>
  )
}

export default User
