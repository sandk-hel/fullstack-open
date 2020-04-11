import React from 'react'
import CountryDetail from './CountryDetail'

const Countries = ({ countries }) => {
    if (countries.length == 1) {
        return <CountryDetail country={countries[0]} />
    }
    return countries.map(country => <p key={country.alpha2Code}>{country.name}</p>)
}

export default Countries
