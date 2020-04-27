import React from 'react'

const CommentForm = ({ addComment }) => {
  const onSubmit = (event) => {
    event.preventDefault()
    addComment(event.target.text.value)
    event.target.text.value = ''
  }

  return <form onSubmit={onSubmit}>
      <input name='text' type='text' />
      <button type='submit'>add comment</button>
    </form>
}

export default CommentForm