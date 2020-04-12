import React, { useState, useEffect } from 'react';
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [searchText, setSearchText] = useState('')
  const [newPerson, setNewPerson] = useState({ name: '', number: '' })
  const [message, setMessage] = useState({isSuccess: true, text: null})

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

  const showMessage = (isSuccess, text) => {
    setMessage({isSuccess: isSuccess, text: text})
    setTimeout(() => {
      setMessage({...message, text: null})
    }, 5000)
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
            const newPersons =  persons.filter(p => p.id !== existingPerson.id)
                                        .concat(returnedPerson)
            setPersons(newPersons)
            showMessage(true, `Updated ${newPerson.name}`)
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
        showMessage(true, `Added ${newPerson.name}`)
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
      <Notification message={message} />
      <Filter searchText={searchText} onChange={(event) => setSearchText(event.target.value)} />
      <h2>add a new </h2>
      <PersonForm newPerson={newPerson} 
                  addNewPerson={addNewPerson} 
                  handleNameChange={handleNameChange}
                  handlePhoneChange={handlePhoneChange} />

      <h2>Numbers</h2>
      <Persons persons={personsToShow} onDelete={onDelete} />
    </div>
  )
}

export default App