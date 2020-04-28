import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { initialize } from '../reducers/users'
import { Route, Switch, useRouteMatch } from 'react-router-dom'
import User from './User'
import { Typography, TableBody, Table, TableRow, TableHead, TableCell } from '@material-ui/core'

const Users = () => {
  const dispatch = useDispatch()
  const users = useSelector(selector => selector.users)
  const match = useRouteMatch('/users/:userId')

  const user = match
    ? users.find(user => user.id === match.params.userId)
    : null

  useEffect(() => {
    dispatch(initialize())
  }, [dispatch])

  const linkStyle = { textDecoration: 'none', color: 'brown' }

  return <Switch>
    <Route path='/users/:userId'>
      <User user={user} />
    </Route>
    <Route path='/users'>
      <div>
        <Typography variant='h3'>Users</Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>
                <Typography variant='h4'>
                  blogs created
          </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map(user => <TableRow key={user.id}>
              <TableCell>
                <Link style={linkStyle} to={`/users/${user.id}`}>
                  <Typography variant="h5">
                    {user.name}
                  </Typography>
                </Link>
              </TableCell>
              <TableCell>
                <Typography variant='h4'>
                  {user.blogs.length}
                </Typography>
              </TableCell>
            </TableRow>)}
          </TableBody>
        </Table>
      </div>
    </Route>
  </Switch>
}

export default Users