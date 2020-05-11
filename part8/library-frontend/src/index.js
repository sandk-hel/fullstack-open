import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { 
  ApolloClient, 
  InMemoryCache, 
  ApolloProvider, 
  HttpLink,  
  split } from '@apollo/client'
import { setContext } from 'apollo-link-context'
import { WebSocketLink } from 'apollo-link-ws'
import { getMainDefinition } from '@apollo/client/utilities'

const setTokenContext = setContext((_, { headers }) => {
  const token = localStorage.getItem('library-frontend-token')
  return {
    headers: {
      ...headers,
      authorization: token  
        ? `bearer ${token}`
        : null
    }
  }
})

const wsLink = new WebSocketLink({
  uri: 'ws://localhost:4000/graphql',
  options: {
    reconnect: true
  }
})

const httpLink = new HttpLink({
  uri: 'http://localhost:4000'
})

const link = split(
  ({ query }) => {
    const definition = getMainDefinition(query)
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    )
},
wsLink,
setTokenContext.concat(httpLink)
)
const client = new ApolloClient({
  link: link,
  cache: new InMemoryCache()
})

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>, 
  document.getElementById('root'))