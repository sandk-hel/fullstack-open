import blogService  from '../services/blogs'
import { storeUser, getUser } from '../services/userDetailStorage'
import loginService from '../services/login'
import { showNotification } from './notifications'

const logInReducer = (state = null, action) => {
  switch (action.type) {
    case 'LOG_IN':
      return action.data
    case 'LOG_OUT':
      return null
    default: 
      return state
  }
}

export const logIn = ({ username, password }) => {
  return async dispatch => {
    try {
      const user = await loginService.login({ username, password })
      storeUser(user)
      blogService.setToken(user.token)
      dispatch ({ type: 'LOG_IN', data: user })
    } catch (exception) {
      dispatch(showNotification('wrong username or password', false))
    }
  }
}

export const logOut = () => {
  return dispatch => {
    dispatch({ type: 'LOG_OUT' })
  }
} 

export const loadUser = () => {
  return dispatch => {
    const loggedInUser = getUser()
    blogService.setToken(loggedInUser.token)
    dispatch ({ type: 'LOG_IN', data: loggedInUser })
  }
}

export default logInReducer
