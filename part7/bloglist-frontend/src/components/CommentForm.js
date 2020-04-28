import React from 'react'
import { TextField, Button, FormGroup } from '@material-ui/core'

const CommentForm = ({ addComment }) => {
  const onSubmit = (event) => {
    event.preventDefault()
    addComment(event.target.text.value)
    event.target.text.value = ''
  }

  return <form onSubmit={onSubmit}>
    <FormGroup >
      <TextField
        placeholder="Write something here..."
        multiline
        rows={2}
        rowsMax={4}
        name='text'
      />
      <Button type='submit'>add comment</Button>
    </FormGroup>
  </form>
}

export default CommentForm