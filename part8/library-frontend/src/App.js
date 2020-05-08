
import React, { useState, useEffect } from 'react'
import { useApolloClient } from '@apollo/client'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import RecommendedBooks from './components/RecommendedBooks'
import { useLazyQuery } from '@apollo/client'
import { BOOKS_FOR_GENRE } from './queries'

const App = () => {
  const [token, setToken] = useState(null)
  const [page, setPage] = useState('authors')
  const client = useApolloClient()
  const [error, setError] = useState(null)

  const [getAllBooks, { data, refetch}] = useLazyQuery(BOOKS_FOR_GENRE) 


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
  }, [ token, page ])

  const logout = () => {
    setPage('authors')
    localStorage.clear()
    setToken(null)
    client.resetStore()
  }

  const notify = (error) => {
    setError(error)
    setTimeout(() => setError(null), 5000)
  }

  const onAddNewBook = () => {
    refetch()
  }

  return (
    <div>
      <Notify message={error} />
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        { token === null 
          ? <button onClick={() => setPage('login')}>login</button>
          : <>
            <button onClick={() => setPage('add')}>add book</button>
            <button onClick={() => setPage('recommendations')}>recommend</button>
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
        query = {{ getAllBooks, data, refetch }}
        />

      <NewBook
        show={page === 'add'}
        addNewBook={onAddNewBook}
      />

      <LoginForm 
        show={page === 'login'}
        setToken={setToken}
        setError={notify}
        />

      <RecommendedBooks 
        show={page === 'recommendations'}
        setError={notify}
        />
    </div>
  )
}

const Notify = ({ message }) => {
  if (!message) {
    return null
  }

  return <div style={{color: 'red'}}>
    {message}
  </div>
}

export default App