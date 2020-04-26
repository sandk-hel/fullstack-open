
const emptyState = { text: null, isSuccess: false }

const notificationReducer = (state = emptyState, action) => {
  switch (action.type) {
    case 'SHOW_NOTIFICATION':
      return action.notification
    case 'HIDE_NOTIFICATION':
      return emptyState
    default:
      return state
  }
}

export const showNotification = (text, isSuccess) => {
  return dispatch => {
    dispatch({ type: 'SHOW_NOTIFICATION',
               notification: { text, isSuccess } })
    setTimeout(() => 
      dispatch({ type: 'HIDE_NOTIFICATION' }), 10000)
  }
}

export default notificationReducer
