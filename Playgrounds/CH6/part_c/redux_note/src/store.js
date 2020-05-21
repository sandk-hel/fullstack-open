import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

import filterReducer from './reducers/filterReducer'
import noteReducer from './reducers/noteReducer'


const reducer = combineReducers({
  filter: filterReducer,
  notes: noteReducer
})

const store = createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
)

export default store