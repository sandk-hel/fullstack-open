import React, { useState } from 'react';

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', phone: '040-1234567' }
  ])
  const [ newPerson, setNewPerson ] = useState({name: '', phone: ''})

  const handleNameChange = (event) => {
    setNewPerson({...newPerson, name: event.target.value})
  }

  const handlePhoneChange = (event) => {
    setNewPerson({...newPerson, phone: event.target.value})
  }

  const addNewPerson = (event) => {
    event.preventDefault()
    const containsName = persons.some(person => person.name === newPerson.name)
    if(containsName) {
      alert(`${newPerson.name} is already added to phonebook`)
      setNewPerson({name: '', phone: ''})
      return
    }
    setNewPerson({name: '', phone: ''})
    setPersons([...persons, newPerson])
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addNewPerson}>
        <div>
          name: 
          <input value={newPerson.name} 
                  onChange={handleNameChange}
                  />
          
        </div>
        <div>
          number: 
          <input value={newPerson.phone} 
                  onChange={handlePhoneChange}
                  />
          
        </div>

        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person => <p key={person.name}>{person.name} {person.phone}</p>)}
      {/* <div>debug: {newName}</div> */}
    </div>
  )
}

export default App