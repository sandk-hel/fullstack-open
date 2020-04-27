import React from 'react'
import { Link } from 'react-router-dom'

const User = ({ user }) => {

  const blogList = () => (
    <>
      <strong>added blogs</strong>
      <ul>
        {user.blogs.map(blog => (
          <li key={blog.id}>
            {blog.title}
          </li>))}
      </ul>
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
    <h2>{user.name}</h2>
    {user.blogs.length === 0
      ? <p>No blogs</p>
      : blogList()}
  </div>
}

export default User