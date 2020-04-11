import React, { useState } from 'react';

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [ searchText, setSearchText ] = useState('')
  const [ newPerson, setNewPerson ] = useState({name: '', number: ''})

  const personsToShow = searchText.length === 0 
    ? [...persons]
    : persons.filter(person => person.name.toLowerCase().includes(searchText.toLowerCase()))

  const handleNameChange = (event) => {
    setNewPerson({...newPerson, name: event.target.value})
  }

  const handlePhoneChange = (event) => {
    setNewPerson({...newPerson, number: event.target.value})
  }

  const addNewPerson = (event) => {
    event.preventDefault()
    const containsName = persons.some(person => person.name === newPerson.name)
    if(containsName) {
      alert(`${newPerson.name} is already added to phonebook`)
      setNewPerson({name: '', number: ''})
      return
    }
    setNewPerson({name: '', number: ''})
    setPersons([...persons, newPerson])
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with<input value={searchText} onChange={ event => setSearchText(event.target.value) } />
      </div>
      <h2>add a new </h2>
      <form onSubmit={addNewPerson}>
        <div>
          name: 
          <input value={newPerson.name} 
                  onChange={handleNameChange}
                  />
          
        </div>
        <div>
          number: 
          <input value={newPerson.number} 
                  onChange={handlePhoneChange}
                  />
          
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {personsToShow.map(person => <p key={person.name}>{person.name} {person.number}</p>)}
      {/* <div>debug: {newName}</div> */}
    </div>
  )
}

export default App