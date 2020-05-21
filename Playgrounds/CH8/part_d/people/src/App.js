import React, { useState, useEffect } from 'react';
import { useQuery, useApolloClient } from '@apollo/client'
import { ALL_PERSONS } from './queries'
import PersonForm from './components/PersonForm'
import PhoneForm from './components/PhoneForm'
import Persons from './components/Persons'
import LoginForm from  './components/LoginForm'

const App = () => {
  const [token, setToken] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const result = useQuery(ALL_PERSONS)
  const client = useApolloClient()

  useEffect(() => {
    const localToken =  localStorage.getItem('phonenumbers-user-token')
    if (localToken) {
      setToken(localToken)
    }
  }, [])

  if (result.loading) {
    return <div>loading...</div>
  }

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }

  if (!token) {
    return (
      <div>
        <Notify errorMessage={errorMessage} />
        <h2>Login</h2>
        <LoginForm 
          setToken={setToken}
          setError={notify}
          />
      </div>
    )
  }
  return (
    <div>
      <Notify errorMessage={errorMessage} />
      <Persons persons={result.data.allPersons} />
      <PersonForm setError={notify} />
      <PhoneForm setError={notify} />
    </div>
  )
}

const Notify = ({ errorMessage }) => {
  if (!errorMessage) {
    return null
  }
  return (
    <div style={{color: 'red'}}>
      {errorMessage}
    </div>
  )
}
export default App