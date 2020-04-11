import React, { useState } from 'react';

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas' }
  ])
  const [ newName, setNewName ] = useState('')

  const handleChange = event => {
    setNewName(event.target.value)
  }

  const addNewName = (event) => {
    event.preventDefault()
    const containsName = persons.some(person => person.name === newName)
    if(containsName) {
      alert(`${newName} is already added to phonebook`)
      setNewName('')
      return
    }
    const newPerson = {name: newName}
    setNewName('')
    setPersons([...persons, newPerson])
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addNewName}>
        <div>
          name: 
          <input value={newName} 
                  onChange={handleChange}
                  />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person => <p key={person.name}>{person.name}</p>)}
      {/* <div>debug: {newName}</div> */}
    </div>
  )
}

export default App