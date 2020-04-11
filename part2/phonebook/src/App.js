import React, { useState } from 'react';
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [searchText, setSearchText] = useState('')
  const [newPerson, setNewPerson] = useState({ name: '', number: '' })

  const personsToShow = searchText.length === 0
    ? [...persons]
    : persons.filter(person => person.name.toLowerCase().includes(searchText.toLowerCase()))

  const handleNameChange = (event) => {
    setNewPerson({ ...newPerson, name: event.target.value })
  }

  const handlePhoneChange = (event) => {
    setNewPerson({ ...newPerson, number: event.target.value })
  }

  const addNewPerson = (event) => {
    event.preventDefault()
    const containsName = persons.some(person => person.name === newPerson.name)
    if (containsName) {
      alert(`${newPerson.name} is already added to phonebook`)
      setNewPerson({ name: '', number: '' })
      return
    }
    setNewPerson({ name: '', number: '' })
    setPersons([...persons, newPerson])
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter searchText={searchText} onChange={(event) => setSearchText(event.target.value)} />
      <h2>add a new </h2>
      <PersonForm newPerson={newPerson} 
                  addNewPerson={addNewPerson} 
                  handleNameChange={handleNameChange}
                  handlePhoneChange={handlePhoneChange} />

      <h2>Numbers</h2>
      <Persons persons={personsToShow} />
      {/* <div>debug: {newName}</div> */}
    </div>
  )
}

export default App