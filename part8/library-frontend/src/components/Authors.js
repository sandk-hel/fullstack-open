  
import React from 'react'
import { useQuery } from '@apollo/client'

import BornYearForm from './BornYearForm'
import { ALL_AUTHORS } from '../queries'

const Authors = (props) => {
  const result = useQuery(ALL_AUTHORS)

  if (!props.show) {
    return null
  }  

  if (!result.data || !result.data.allAuthors) {
    return null
  }
  
  const authors = result.data.allAuthors
  const options = authors.map(author => ({ value: author.name, label: author.name }))
  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
      <BornYearForm options={options} show={props.showEditForm}/>             
    </div>
  )
}

export default Authors
