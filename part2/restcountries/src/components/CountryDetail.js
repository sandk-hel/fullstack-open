import React from 'react'
import Languages from './Languages'
import Weather from './Weather'

const CountryDetail = ({ country }) => {
    return (
        <div>
            <h2>{country.name}</h2>
            <p>capital {country.capital}</p>
            <p>population {country.population}</p>
            <img  alt={country.name} width="200" src={country.flag} />
            <Languages languages={country.languages} />
            <Weather capital={country.capital} />
        </div>
    )
}

export default CountryDetail
