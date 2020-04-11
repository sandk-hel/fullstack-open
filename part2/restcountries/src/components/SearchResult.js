import React from 'react'
import Countries from './Countries'

const SearchResult = ({ countries }) => {
    if (countries.length > 10) {
        return <p>Too many matches, specify another filter</p>
    }

    if (countries.length > 0)  {
        return <Countries countries={countries} />
    }

    return <p>No such country could be found</p>
}

export default SearchResult
