import React from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, increaseLike }) => {
  if (!blog) {
    return <p>No blog found</p>
  }
  return <div>
    <div>
      <h2>
        {blog.title} {blog.author}
      </h2>
    </div>
    <div>
      <div>
        <a href={blog.url} target="_">{blog.url}</a>
      </div>
      <div>
      {blog.likes} likes
        <button onClick={() => increaseLike(blog) }>like</button>
      </div>
      <div>
        {blog.user.name}
      </div>
    </div>
    {blog.comments.length == 0 
    ? <p>No comments yet</p>
    : 
    <>
    <h2>Comments</h2>
    <ul>
    {blog.comments.map(comment => (
      <li key={comment.id}>{comment.text}</li>))}
    </ul>
    </>
    }
  </div>
}

Blog.prototypes = {
  increaseLike: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired,
  blog: PropTypes.string.isRequired
}

export default Blog
