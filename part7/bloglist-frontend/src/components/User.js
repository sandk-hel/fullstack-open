import React from 'react'
import { Link } from 'react-router-dom'
import BlogList from './BlogList'
import  { Typography, Divider } from '@material-ui/core'

const User = ({ user }) => {

  const blogList = () => (
    <>
      <Typography variant='h5' style={{color:'brown'}}>Added blogs</Typography>
      <Divider />
      <BlogList blogs={user.blogs} />
    </>
  )

  const invalidUser = () => (
    <div>
      <p>No such user found.</p>
      <Link to='/users'>Go back</Link>
    </div>
  )

  if (!user) {
    return invalidUser()
  }
  return <div>
    <Typography variant='h2' style={{margin: 20, textAlign: 'center'}}>{user.name}</Typography>
    {user.blogs.length === 0
      ? <p>No blogs</p>
      : blogList()}
  </div>
}

export default User