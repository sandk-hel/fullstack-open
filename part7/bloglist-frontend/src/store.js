import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import blogsReducer from './reducers/blogs'
import notificationReducer from './reducers/notifications'
import loggedInUserReducer from './reducers/loggedInUser'

const reducers = combineReducers({
  blogs: blogsReducer,
  notification: notificationReducer,
  loggedInUser: loggedInUserReducer,
})

const store = createStore(reducers, 
  applyMiddleware(thunk)
  )

export default store
