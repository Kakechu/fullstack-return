import { Alert } from '@mui/material'
import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector((state) => state.notification)

  if (!notification.text) return null

  return <Alert severity={notification.type}>{notification.text}</Alert>
}

export default Notification
