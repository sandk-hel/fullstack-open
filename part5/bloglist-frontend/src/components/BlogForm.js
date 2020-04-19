import React, { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title,
      author,
      url
    })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return <>
    <h2>create new</h2>
    <form onSubmit={addBlog}>
      <div>
        <label>title</label>
        <input
          id='title'
          name='title'
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>

      <div>
        <label>author</label>
        <input
          id='author'
          name='author'
          value={author}
          onChange={({ target }) => setAuthor(target.value)} />
      </div>

      <div>
        <label>url</label>
        <input
          id='url'
          name='url'
          value={url}
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>

      <div>
        <button type='submit'>create</button>
      </div>

    </form>
  </>
}

BlogForm.propTypes = {
  createBlog: PropTypes.func
}

export default BlogForm
