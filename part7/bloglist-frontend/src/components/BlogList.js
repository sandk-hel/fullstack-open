import React from 'react'
import { List, ListItem, Typography } from '@material-ui/core'
import { Link } from 'react-router-dom'

const BlogList = ({ blogs }) => {
  return <List>
    {blogs.map(blog =>
      <ListItem button key={blog.id} component={Link} to={`/blogs/${blog.id}`}>
        <Typography variant='h6'>
          {blog.title}
        </Typography>
      </ListItem>
    )}
  </List>
}

export default BlogList
