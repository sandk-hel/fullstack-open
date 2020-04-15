import React from 'react'

const PersonForm = ({ newPerson, handleNameChange, handlePhoneChange, addNewPerson }) => {
  return (
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
  )
}

export default PersonForm