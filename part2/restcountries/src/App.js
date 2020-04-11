import React, { useState, useEffect } from 'react';
import axios from 'axios'
import SearchResult from './components/SearchResult'
import Filter from './components/Filter'

const App = () => {
  const [searchText, setSearchText] = useState('')
  const [countries, setCountries] = useState([])

  const countriesToShow = countries.filter(country => {
    return country.name.toLowerCase().includes(searchText.toLowerCase())
  })

  const handleSearchTextChange = (event) => {
    setSearchText(event.target.value)
  }

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  return (<div>
    <Filter searchText={searchText} onChange={handleSearchTextChange} />
    <SearchResult countries={countriesToShow} />
  </div>
  )
}
export default App

