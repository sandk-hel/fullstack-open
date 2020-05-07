import React, { useState } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'

const Books = (props) => {
  const result = useQuery(ALL_BOOKS)
  const [genre, setGenre] = useState(null)

  if (!props.show) {
    return null
  }

  if (!result || !result.data) {
    return null
  }

  const books = result.data.allBooks
  const genres = books.reduce((acc, book) =>  {
    const newGenres = book.genres.filter(genre => !acc.includes(genre))
    return acc.concat(newGenres)
  }, [])

  const filteredBooks = books.filter(book => {
    if (!genre) {
      return true
    }
    return book.genres.includes(genre)
  })
  
  return (
    <div>
      <h2>books</h2>
      { genre 
      ? <div>in genre {genre}</div>
      : null }
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {filteredBooks.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
      <div>
        {genres.map(genre => <button key={genre} onClick={() => setGenre(genre)}>{genre}</button>)}
      </div>
    </div>
  )
}

export default Books