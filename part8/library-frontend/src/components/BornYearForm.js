import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { UPDATE_BIRTH_YEAR } from '../queries'
import Select from 'react-select'

const BornYearForm = ({ options, show }) => {
  const [author, setAuthor] = useState(null)
  const [year, setYear] = useState('')

  const [updateBornYear] = useMutation(UPDATE_BIRTH_YEAR)

  if (!show) {
    return null
  }
  
  const submit = (event) => {
    event.preventDefault()
    
    updateBornYear({
      variables: { author: author.value, year: parseInt(year) }
    })
    setAuthor('')
    setYear('')
  }
  return <div>
    <h2>Set birthyear</h2>
      <form onSubmit={submit}>
        <div>
          name 
          <Select 
            value={author}
            onChange={selectedOption => { setAuthor(selectedOption) }}
            options={options}
          />
        </div>
        <div>
          born <input 
            value={year}
            onChange={({ target }) => setYear(target.value) }
            />
        </div>
        <button type="submit">update author</button>
      </form>
  </div>
}

export default BornYearForm