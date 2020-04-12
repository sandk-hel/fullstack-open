import React from 'react'
import CountryDetail from './CountryDetail'
import Country from './Country'

const Countries = ({ countries, showDetail }) => {
    if (countries.length == 1) {
        return <CountryDetail country={countries[0]} />
    }
    return countries.map(country => <Country key={country.alpha2Code} 
                                             country={country} 
                                             showDetail={showDetail} />
                                             )
}

export default Countries
