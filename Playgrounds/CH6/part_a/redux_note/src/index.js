import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import noteState  from './reducers/noteReducer'
import App from './App'


let store = createStore(noteState)

let renderApp = () =>  ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)


store.subscribe(renderApp)

renderApp()
