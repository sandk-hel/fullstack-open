import React from 'react'
import CommentForm from './CommentForm'

const Comments = ({ comments, addComment }) => {
  if(comments.length == 0) {
    return <div>
      <CommentForm addComment={addComment} />
      <p>No comments yet</p>
    </div>
  }

  return <>
    <h2>Comments</h2>
    <CommentForm addComment={addComment} />
    <ul>
    {comments.map(comment => (
      <li key={comment.id}>{comment.text}</li>))}
    </ul>
    </>
}

export default Comments
