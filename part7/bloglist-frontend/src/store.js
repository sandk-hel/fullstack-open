import { createStore, combineReducers } from 'redux'

import blogsReducer from './reducers/blogs'
import notificationReducer from './reducers/notifications'


const reducers = combineReducers({
  blogs: blogsReducer,
  notification: notificationReducer
})

const store = createStore(reducers)

export default store
