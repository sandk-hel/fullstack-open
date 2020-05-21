import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { Button, Input, Navigation, Page, Footer } from './styles'
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
    props.onLogin('mluukkai')
    history.push('/')
  }

  return (
    <div>
      <h2>login</h2>
      <form onSubmit={onsubmit}>
        <div>
          username: <Input />
        </div>
        <div>
          password: <Input type='password' />
        </div>
        <Button type='submit'>login</Button>
      </form>
    </div>
  )
}

const notes = [
  {
    "content": "the app state is in redux store",
    "important": true,
    "id": 1
  },
  {
    "content": "state changes are made with actions",
    "important": false,
    "id": 2
  },
  {
    "content": "Redux is really awesome man!",
    "important": false,
    "id": 3
  },
  {
    "content": "How did I miss this saaga thingy ?",
    "important": false,
    "id": 4
  },
  {
    "content": "And this is new with thunk",
    "important": false,
    "id": 5
  },
  {
    "content": "And this is new",
    "important": false,
    "id": 6
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
    <ul>
      {notes.map(note=> 
      <li key={note.id}>
        <Link to={`/notes/${note.id}`}>{note.content}</Link>
      </li>)}
    </ul>
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
  const padding = {
    padding: 5
  }

  return (<Page>
    <Navigation>
      <Link style={padding} to='/'>home</Link>
      <Link style={padding} to='/notes'>notes</Link>
      <Link style={padding} to='/users'>users</Link>
      {user 
        ? <em>{user} logged in</em>
        : <Link style={padding} to="/login">login</Link>
      }
    </Navigation>
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
        <Login />
      </Route>
      <Route path ='/'>
        <Home />
      </Route>
    </Switch>
    <Footer>
      <i>Note app, Department of Computer Science 2020</i>
    </Footer></Page>)
}
export default App;
