import React, { useState, useEffect } from 'react'
import { useLazyQuery } from '@apollo/client'
import { BOOKS_FOR_GENRE } from '../queries'

const Books = (props) => {
  const [allGenres, setAllGenres] = useState([])
  const [genre, setGenre] = useState(null)
  const [getAllBooks, { data, refetch}] = useLazyQuery(BOOKS_FOR_GENRE) 

  useEffect(() => {
    getAllBooks({ variables: { genre } })
  }, [ genre ])

  if (!props.show) {
    return null
  }

  if (!data) {
    return null
  }

  const books = data.allBooks
  
  if (allGenres.length === 0) {
    const genres = books.reduce((acc, book) =>  {
      const newGenres = book.genres.filter(genre => !acc.includes(genre))
      return acc.concat(newGenres)
    }, [])
    setAllGenres(genres)
  }
  
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
          {books.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
      <div>
        {allGenres.map(genre => <button key={genre} onClick={() => { setGenre(genre); refetch() }}>{genre}</button>)}
      </div>
    </div>
  )
}

export default Books