import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import blogsReducer from './reducers/blogs'
import notificationReducer from './reducers/notifications'


const reducers = combineReducers({
  blogs: blogsReducer,
  notification: notificationReducer
})

const store = createStore(reducers, 
  applyMiddleware(thunk)
  )

export default store
