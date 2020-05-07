import React, { useState, useEffect } from 'react'
import { useQuery, useLazyQuery } from '@apollo/client'
import { RECOMMENDATION } from '../queries'

const RecommendedBooks = ({ show, refetch }) => {
  const [getResult, result] = useLazyQuery(RECOMMENDATION, {
    onError: (error) => {
      console.log('Error occurred: ', error.message)
    }
  })

  const [recommendation, setRecommendation] = useState(null)
  
  useEffect(() => {
    getResult()
  }, [ show, getResult ])

  useEffect(() => {
    if (result.error) {
      return
    }
    if (result.loading) {
      return 
    }
    if (!result.data || !result.data.recommendation) {
      return 
    }
    setRecommendation(result.data.recommendation)
  }, [ result.data, result.loading ])

  if (!show) {
    return null
  }
  
  if (!recommendation) {
    return null
  }

  const books = recommendation.books
  const genre = recommendation.genre
  return (
    <div>
      <h2>recommendations</h2>
      <div>books in your favorite genre <strong>{genre}</strong></div>
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
    </div>
  )
}

export default RecommendedBooks