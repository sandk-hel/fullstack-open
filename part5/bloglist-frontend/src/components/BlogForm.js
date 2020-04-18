import React, { useState } from 'react'

let BlogForm = ({ createBlog }) => {
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
          name='title'
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>

      <div>
        <label>author</label>
        <input
          name='author'
          value={author}
          onChange={({ target }) => setAuthor(target.value)} />
      </div>

      <div>
        <label>url</label>
        <input
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

export default BlogForm
