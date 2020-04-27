import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { initialize } from '../reducers/users'

const Users = () => {
  const dispatch = useDispatch()
  const users = useSelector(selector => selector.users)

  useEffect(() => {
    dispatch(initialize())
  }, [])

  return <div>
    <h1>Users</h1>
    <table>
      <thead>
        <tr>
          <th></th>
          <th>blogs created</th>
        </tr>
      </thead>
      <tbody>
        {users.map(user => <tr>
          <td>{user.name}</td>
          <td>{user.blogs.length}</td>
        </tr>)}
      </tbody>
    </table>
  </div>
}

export default Users