import React, { useState } from 'react'
import logo from './logo.svg'
import './App.css'
import {
  useRouteMatch,
  Switch, Route, Link,
  useParams,
  useHistory,
  Redirect
} from 'react-router-dom'
import Container from '@material-ui/core/Container'
import { Paper, 
         Table, 
         TableContainer, 
         TableBody, 
         TableCell, 
         TableRow,
         TextField,
         Button, 
         AppBar,
         Toolbar,
         IconButton} from '@material-ui/core'
import { Alert } from '@material-ui/lab'


const Login = (props) => {
  const history = useHistory()

  const onSubmit = (event) => {
    event.preventDefault()
    props.onLogin(event.target.username.value)
    history.push('/')
  }

  return (
    <div>
      <h2>login</h2>
      <form onSubmit={onSubmit}>
        <div>
          <TextField label='username' name='username' />
        </div>
        <div>
          <TextField label='password' type='password' />
        </div>
        <Button variant='contained' color='primary' type='submit'>
          login
        </Button>
      </form>
    </div>
  )
}

const notes = [
  {
    "content": "the app state is in redux store",
    "important": true,
    "id": 1,
    "user": "Sandeep Koirala"
  },
  {
    "content": "state changes are made with actions",
    "important": false,
    "id": 2,
    "user": "Sandeep Koirala"
  },
  {
    "content": "Redux is really awesome man!",
    "important": false,
    "id": 3,
    "user": "Reyan Basnet"
  },
  {
    "content": "How did I miss this saaga thingy ?",
    "important": false,
    "id": 4,
    "user": "Reyan Basnet"
  },
  {
    "content": "And this is new with thunk",
    "important": false,
    "id": 5,
    "user": "Reyan Basnet"
  },
  {
    "content": "And this is new",
    "important": false,
    "id": 6,
    "user": "Reyan Basnet"
  }
]


const Home = () => (
  <div><h2>TKTL notes app</h2>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    </p>
  </div>
)

const Note = ({ note }) => {
  return (
    <div>
      <h2>{note.content}</h2>
      <div>{note.user}</div>
      <div><strong>{note.important ? 'important' : ''}</strong></div>
    </div>
  )
}

const Notes = ({ notes }) => (
  <div>
    <h2>Notes</h2>
    <TableContainer component={Paper}>
      <Table>
        <TableBody>
          {notes.map(note => (
            <TableRow key={note.id}>
              <TableCell>
                <Link to={`/notes/${notes.id}`}>{note.content}</Link>
              </TableCell>
              <TableCell>
                {note.user}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    {/* <ul>
      {notes.map(note=> 
      <li key={note.id}>
        <Link to={`/notes/${note.id}`}>{note.content}</Link>
      </li>)}
    </ul> */}
  </div>
)

const Users = () => (
  <div><h2>Users</h2></div>
)

const App = () => {

  const match = useRouteMatch('/notes/:id')
  const note = match 
    ? notes.find(note => note.id === Number(match.params.id))
    : null

  const [message, setMessage] = useState(null)
  const [user, setUser] = useState(null)
  const padding = {
    padding: 5
  }

  const onLoggedIn = (username) => {
    setUser(username)
    setMessage(`${username} logged in`)
  }

  return (<div>
    {(message && 
      <Alert severity='success'>
        {message}
      </Alert>
    )}
    <div>
      <AppBar position='static'>
        <Toolbar>
          <IconButton edge='start' color='inherit' aria-label='menu'>
          </IconButton>
          <Button color='inherit' component={Link} to='/'>
            home
          </Button>
          <Button color='inherit' component={Link} to='/notes'>
            notes
          </Button>
          <Button color='inherit' component={Link} to='/users'>
            users
          </Button>
        {user 
        ? <em>{user} logged in</em>
        : <Button color='inherit' component={Link} to="/login">login</Button>}
        </Toolbar>
      </AppBar>
    </div>
    <Switch>
      <Route path='/notes/:id'>
        <Note note={note} />
      </Route>

      <Route path='/notes'>
        <Notes notes={notes}/>
      </Route>
      <Route path='/users' render={() => 
      user ? <Users /> : <Redirect to='/login' />
      } />
      <Route path='/login'>
        <Login  onLogin={onLoggedIn}/>
      </Route>
      <Route path ='/'>
        <Home />
      </Route>
    </Switch>
    <div>
      <i>Note app, Department of Computer Science 2020</i>
    </div></div>)
}
export default App;
