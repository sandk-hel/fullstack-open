import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import blogsReducer from './reducers/blogs'
import notificationReducer from './reducers/notifications'
import loggedInUserReducer from './reducers/loggedInUser'
import usersReducer from './reducers/users'

const reducers = combineReducers({
  blogs: blogsReducer,
  notification: notificationReducer,
  loggedInUser: loggedInUserReducer,
  users: usersReducer
})

const store = createStore(reducers, 
  composeWithDevTools(
    applyMiddleware(thunk)
  )
)

export default store
