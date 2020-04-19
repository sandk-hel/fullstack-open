import React from 'react'

const Notification = ({ notification: { text, isSuccess } }) => {
  if (text === null) {
    return null
  }

  let className = 'success'

  if (!isSuccess) {
    className = 'error'
  }

  return (
    <div className={className}>
      {text}
    </div>
  )
}

export default Notification
