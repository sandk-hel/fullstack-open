import React from 'react'
import PropTypes from 'prop-types'
import Comments from './Comments'
import { Typography, Link, IconButton } from '@material-ui/core'
import { ThumbUpSharp } from '@material-ui/icons'

const Blog = ({ blog, likeBlog,  addComment }) => {
  if (!blog) {
    return <p>No blog found</p>
  }
  return <div style={{marginTop: 20}}>
    <div>
      <Typography variant='h4'>
        {blog.title} {blog.author}
      </Typography>
    </div>
    <div>
      <div>
        <Link href={blog.url} target="_">{blog.url}</Link>
      </div>
      <div>
      {blog.likes} likes
      <IconButton onClick={() => likeBlog(blog) } color="primary" aria-label="Like" component="span">
        <ThumbUpSharp />
      </IconButton>
      </div>
      <div>
        {blog.user.name}
      </div>
    </div>
    <Comments comments={blog.comments} addComment={addComment} />
  </div>
}

Blog.prototypes = {
  likeBlog: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired,
  blog: PropTypes.string.isRequired
}

export default Blog
