import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { Table, Form, Button, Alert, Navbar, Nav } from 'react-bootstrap'
import {
  useRouteMatch,
  Switch, Route, Link,
  useParams,
  useHistory,
  Redirect
} from 'react-router-dom'


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
      <Form onSubmit={onSubmit}>
        <Form.Group>
          <Form.Label>username:</Form.Label>
          <Form.Control
            type='text'
            name='username'
          />
          <Form.Label>password:</Form.Label>
          <Form.Control
            type='password'
            name='password'
          />
          <Button variant='primary' type='submit'>
            login
          </Button>
        </Form.Group>
      </Form>
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
    "user": "Sabina Koirala"
  },
  {
    "content": "How did I miss this saaga thingy ?",
    "important": false,
    "id": 4,
    "user": "Sandeep Koirala"
  },
  {
    "content": "And this is new with thunk",
    "important": false,
    "id": 5,
    "user": "Yuvika Paudel"
  },
  {
    "content": "And this is new",
    "important": false,
    "id": 6,
    "user": "Yuvika Paudel"
  }
]


const Home = () => (
  <div><h2>TKTL notes app</h2></div>
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
    <Table striped>
      <tbody>
        {notes.map(note =>
          <tr key={note.id}>
            <td>
              <Link to={`/notes/${note.id}`}>
                {note.content}
              </Link>
            </td>
            <td>
              {note.user}
            </td>
          </tr>
        )}
      </tbody>
    </Table>
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

  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)

  const login = (user) => {
    setUser(user)
    setMessage(`welcome ${user}`)
    setTimeout(() => {
      setMessage(null)
    }, 10000)
  }

  const padding = {
    padding: 5
  }

  return (<div className='container'>
    {(message && 
      <Alert variant='success' className='alert alert-primary'>
        {message}
      </Alert>
      )}
    <Navbar collapseOnSelect expand='lg' bg='dark' variant='dark'>
      <Navbar.Toggle aria-controls='responsive-navbar-nav'>
        <Navbar.Collapse id='responsive-navbar-nav'>
          <Nav className='mr-auto'>
            <Nav.Link href='#' as='span'>
              <Link style={padding} to='/'>home</Link>
            </Nav.Link>
            <Nav.Link href='#' as='span'>
              <Link style={padding} to='/notes'>notes</Link>
            </Nav.Link>
            <Nav.Link href='#' as='span'>
              <Link style={padding} to='/users'>users</Link>
            </Nav.Link>
            <Nav.Link href='#' as='span'>
              {user 
                ? <em>{user} logged in</em>
                : <Link to='/login'>login</Link>
              }
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar.Toggle>
    </Navbar>
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
        <Login onLogin={(username) => login(username)}/>
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
