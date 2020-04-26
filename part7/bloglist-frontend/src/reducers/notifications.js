
const emptyState = { text: null, isSuccess: false }

const notificationReducer = (state = emptyState, action) => {
  switch (action.type) {
    case 'SHOW_NOTIFICATION':
      return action.notification
    case 'HIDE_NOTIFICATION':
      return emptyState
    default:
      return emptyState
  }
}

export const showNotification = (text, isSuccess) => {
  return {
    type: 'SHOW_NOTIFICATION',
    notification: { text, isSuccess }
  }
}

export const hideNotification = message => {
  return {
    type: 'HIDE_NOTIFICATION'
  }
}

export default notificationReducer
