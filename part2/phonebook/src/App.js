import React, { useState, useEffect } from 'react';
import axios from 'axios'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [searchText, setSearchText] = useState('')
  const [newPerson, setNewPerson] = useState({ name: '', number: '' })

  useEffect(() => {
    personService
      .getAll()
      .then(persons => {
        setPersons(persons)
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
    const existingPerson = persons.find(person => person.name === newPerson.name)
    if (existingPerson) {
      const shouldUpdate = window.confirm(`${newPerson.name} is already added to phonebook, replace the old number with a new one?`)
      if (shouldUpdate) {
        personService
          .update(existingPerson.id, newPerson)
          .then(returnedPerson => {
            setPersons(persons.filter(p => p.id !== existingPerson.id)
                              .concat(returnedPerson))
          })
      }

      setNewPerson({ name: '', number: '' })
      return
    }

    personService
      .create(newPerson)
      .then(returnedPerson => {
        setNewPerson({ name: '', number: '' })
        setPersons([...persons, returnedPerson])
      })
  }
  
  const onDelete = id => () => {
    const person = persons.find(p => p.id === id)
    if(!window.confirm(`Delete ${person.name}`)) {
      return
    }

    personService
      .remove(id)
      .then(() => {
        setPersons(persons.filter(p => person.id !== p.id))
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
      <Persons persons={personsToShow} onDelete={onDelete} />
      {/* <div>debug: {newName}</div> */}
    </div>
  )
}

export default App