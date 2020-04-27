import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { initialize } from '../reducers/users'
import { Route, Switch, useRouteMatch } from 'react-router-dom'
import User from './User'

const Users = () => {
  const dispatch = useDispatch()
  const users = useSelector(selector => selector.users)
  const match = useRouteMatch('/users/:userId')

  const user = match 
    ? users.find(user => user.id === match.params.userId)
    : null
  
  useEffect(() => {
    dispatch(initialize())
  }, [ dispatch ])

  return <Switch>
  <Route path='/users/:userId'>
    <User user={user} />
  </Route>
  <Route path='/users'>
    <div>
    <h1>Users</h1>
    <table>
      <thead>
        <tr>
          <th></th>
          <th>blogs created</th>
        </tr>
      </thead>
      <tbody>
        {users.map(user => <tr key={user.id}>
          <td><Link to={`/users/${user.id}`}>{user.name}</Link></td>
          <td>{user.blogs.length}</td>
        </tr>)}
      </tbody>
    </table>
  </div>
  </Route>
  </Switch>
}

export default Users