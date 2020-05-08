import React, { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client'
import { LOGIN } from '../queries'

const LoginForm = ({ show, setToken, setError }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [login, result] = useMutation(LOGIN, {
    onError: (error) => {
      const message = error.graphQLErrors[0].message
      setError(message)
    }
  })

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value
      localStorage.setItem('library-frontend-token', token)
      setToken(token)
    }
  }, [ result.data, setToken ] )

  if (!show) {
    return null
  }

  if (result.loading)  {
    return <div>Logging in</div>
  }

  const submit = (event) => {
    event.preventDefault()
    login({ variables: {
      username,
      password
    } })
    setUsername('')
    setPassword('')
  }

  return <form onSubmit={submit}>
    <div>
      name <input value={username}
        onChange={({ target }) => setUsername(target.value)}
        />
    </div>
    <div>
      password <input value={password}
        type='password'
        onChange={({ target }) => setPassword(target.value)}
        />
    </div>
    <button type='submit'>login</button>
  </form>
}

export default LoginForm