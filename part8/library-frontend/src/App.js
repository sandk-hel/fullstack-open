
import React, { useState, useEffect } from 'react'
import { useApolloClient } from '@apollo/client'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'

const App = () => {
  const [token, setToken] = useState(null)
  const [page, setPage] = useState('authors')
  const client = useApolloClient()

  useEffect(() => {
    const token = localStorage.getItem('library-frontend-token')
    if (token) {
      setToken(token)
    }
  }, [])

  useEffect(() => {
    if (page === 'login' && token !== null) {
      setPage('authors')
    }
  }, [ token ])

  const logout = () => {
    localStorage.clear()
    setToken(null)
    client.resetStore()
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        { token === null 
          ? <button onClick={() => setPage('login')}>login</button>
          : <>
            <button onClick={() => setPage('add')}>add book</button>
            <button onClick={logout}>logout</button>
          </>
        }
      </div>

      <Authors
        show={page === 'authors'}
        showEditForm={token !== null}
      />

      <Books
        show={page === 'books'}
      />

      <NewBook
        show={page === 'add'}
      />

      <LoginForm 
        show={page === 'login'}
        setToken={setToken}
        />
      
    </div>
  )
}

export default App