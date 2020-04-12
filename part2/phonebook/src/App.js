import React, { useState, useEffect } from 'react';
import axios from 'axios'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [searchText, setSearchText] = useState('')
  const [newPerson, setNewPerson] = useState({ name: '', number: '' })

  useEffect(() => {
    axios
      .get('/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])

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
    
    axios
      .post('/persons', newPerson)
      .then(response => {
        setNewPerson({ name: '', number: '' })
        setPersons([...persons, response.data])
      })
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