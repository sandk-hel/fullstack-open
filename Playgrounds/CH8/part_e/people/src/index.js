import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { 
  ApolloClient, ApolloProvider, HttpLink, InMemoryCache, split } from '@apollo/client'

import { setContext } from 'apollo-link-context'

import { getMainDefinition } from '@apollo/client/utilities'
import { WebSocketLink } from '@apollo/link-ws'

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('phonenumbers-user-token')
  return {
    headers: {
      ...headers,
      authorization: token ? `bearer ${token}` : null
    }
  }
})

const link = new HttpLink({ uri: 'http://localhost:4000' })

const wslink = new WebSocketLink({
  uri: `ws://localhost:4000/graphql`,
  options: {
    reconnect: true
  }
})

const splitLink = split(({ query }) => {
  const definition = getMainDefinition(query)
  return (
    definition.kind === 'OperationDefinition' &&
    definition.operation === 'subscription'
  )
},
wslink,
authLink.concat(link)
)

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: splitLink
})

ReactDOM.render(
  <ApolloProvider client={client}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </ApolloProvider>,
  document.getElementById('root')
)
