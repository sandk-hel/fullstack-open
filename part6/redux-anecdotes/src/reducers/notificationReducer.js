const initialNotification = 'Welcome to anecdotes!'

const notificationReducer = (state = initialNotification, action) => {
  switch (action.type) {
    case 'NOTIFICATION':
      return action.message
    default:
      return state
  }
}

export default notificationReducer
