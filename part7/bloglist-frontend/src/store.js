import { createStore } from 'redux'

import notificationReducer from './reducers/notifications'

const store = createStore(notificationReducer)

export default store
