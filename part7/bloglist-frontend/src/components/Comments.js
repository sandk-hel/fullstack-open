import React from 'react'
import CommentForm from './CommentForm'
import { Typography, Divider } from '@material-ui/core'

const Comments = ({ comments, addComment }) => {
  const divider = () => <Divider variant="middle" style={{ margin: 20 }} />
  const listStyle = { listStyle: 'none' }
  return <>
    {divider()}
    <Typography variant='h5'>Comments</Typography>
    <CommentForm addComment={addComment} />
    {comments.length === 0 
      ? <p>No comments yet</p>
      : <ul style={listStyle}>
    {comments.map(comment => (
      <li key={comment.id}>
        {comment.text}
        {divider()}
      </li>))}
    </ul>
    }
    </>
}

export default Comments
