import React from 'react'
import Languages from './Languages'

const CountryDetail = ({ country }) => {
    return (
        <div>
            <h2>{country.name}</h2>
            <p>capital {country.capital}</p>
            <p>population {country.population}</p>
            <img width="200" src={country.flag} />
            <Languages languages={country.languages} />
        </div>
    )
}

export default CountryDetail
