import React from 'react'
import PropTypes from 'prop-types'
import { Typography, TextField, Button } from '@material-ui/core';

const BlogForm = ({ createBlog }) => {

  const addBlog = (event) => {
    event.preventDefault()
    const title = event.target.title.value
    const author = event.target.author.value
    const url = event.target.url.value
    createBlog({
      title,
      author,
      url
    })
    event.target.title.value = ''
    event.target.author.value = ''
    event.target.url.value = ''
  }

  const topMargin = { marginTop: 20 }
  return <>
    <Typography variant='h4'>Create New</Typography>
    <form onSubmit={addBlog}>
      <div>
      <TextField required label="Title" defaultValue=""
          name='title' />
      </div>

      <div>
      <TextField required label="Author" defaultValue=""
          name='author' />
      </div>

      <div>
      <TextField required label="URL" defaultValue=""
          name='url' />
      </div>

      <div>
        <Button variant="outlined" color="primary" type='submit' style={topMargin}>create</Button>
      </div>

    </form>
  </>
}

BlogForm.propTypes = {
  createBlog: PropTypes.func
};

export default BlogForm
