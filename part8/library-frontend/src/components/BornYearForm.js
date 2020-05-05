import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { UPDATE_BIRTH_YEAR } from '../queries'

const BornYearForm = () => {
  const [author, setAuthor] = useState('')
  const [year, setYear] = useState('')

  const [updateBornYear] = useMutation(UPDATE_BIRTH_YEAR)

  const submit = (event) => {
    event.preventDefault()
    
    updateBornYear({
      variables: { author, year: parseInt(year) }
    })
    setAuthor('')
    setYear('')
  }
  return <div>
    <h2>Set birthyear</h2>
      <form onSubmit={submit}>
        <div>
          name <input 
            value={author}
            onChange={({ target }) => setAuthor(target.value) }
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