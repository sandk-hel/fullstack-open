import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import { composeWithDevTools } from 'redux-devtools-extension'

import noteReducer  from './reducers/noteReducer'
import filterReducer from './reducers/filterReducer'

import App from './App'


const reducer = combineReducers({
  notes: noteReducer,
  filter: filterReducer
})

let store = createStore(
  reducer, 
  composeWithDevTools()
  )

let renderApp = () =>  ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)



renderApp()
