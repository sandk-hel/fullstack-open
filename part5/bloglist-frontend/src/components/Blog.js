import React, { useState } from 'react'
const Blog = ({ blog, increaseLike, deleteBlog }) => {
  const [visible, setVisible] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const showsWhenVisible = { 'display': visible ? '' : 'none' }
  const showsWhenHidden = { 'display': visible ? 'none' : '' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return <div style={blogStyle}>
    <div>
      {blog.title} {blog.author}
      <button style={showsWhenHidden} onClick={toggleVisibility}>view</button>
      <button style={showsWhenVisible} onClick={toggleVisibility}>hide</button>

    </div>
    <div style={showsWhenVisible}>
      <div>
        {blog.url}
      </div>
      <div>
        likes {blog.likes}
        <button onClick={() => increaseLike(blog) }>like</button>
      </div>
      <div>
        {blog.user.name}
      </div>
      {deleteBlog === null 
        ? "" 
        : <button onClick={() => deleteBlog(blog) }>remove</button>}
    </div>
  </div>
}

export default Blog
