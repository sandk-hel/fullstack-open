import React from 'react'

const Persons = ({ persons, onDelete }) => (
  persons.map((person) => (
    <p key={person.name}>
      {person.name} {person.number}
      <button onClick={onDelete(person.id)}>delete</button>
    </p>
  ))
)

export default Persons