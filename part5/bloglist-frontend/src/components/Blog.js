import React, { useState } from 'react'
import PropTypes from 'prop-types'

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

  const detailContent = () => 
    <div className='detail-content'>
      <div>
        {blog.url}
      </div>
      <div>
        likes {blog.likes}
        <button onClick={() => increaseLike(blog)}>like</button>
      </div>
      <div>
        {blog.user.name}
      </div>
      {deleteBlog === null
        ? ''
        : <button onClick={() => deleteBlog(blog)}>remove</button>}
    </div>

  return <div style={blogStyle}>
    <div className='main-content'>
      {blog.title} {blog.author}
      <button style={showsWhenHidden} onClick={toggleVisibility}>view</button>
      <button style={showsWhenVisible} onClick={toggleVisibility}>hide</button>
    </div>
    { visible
      ? detailContent()
      : null
    }
  </div>
}

Blog.prototypes = {
  increaseLike: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired,
  blog: PropTypes.string.isRequired
}

export default Blog
