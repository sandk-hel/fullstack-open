const initialNotification = 'Welcome to anecdotes!'

let timeoutID = null

const notificationReducer = (state = initialNotification, action) => {
  switch (action.type) {
    case 'SHOW_NOTIFICATION':
      return action.message
    case 'HIDE_NOTIFICATION':
      return null
    default:
      return state
  }
}

export const setNotification = (message, time) => {
  clearInterval(timeoutID)

  return async dispatch => {
    dispatch({
      type: 'SHOW_NOTIFICATION',
      message
    })

    timeoutID = setTimeout(() => {
      dispatch({
        type: 'HIDE_NOTIFICATION'
      })
    }, time * 1000)
  }
}

export default notificationReducer
