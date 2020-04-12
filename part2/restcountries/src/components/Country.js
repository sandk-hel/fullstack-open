import React from 'react'

const Country = ({ country, showDetail }) => (
    <p key={country.alpha2Code}>
        {country.name}
        <button onClick={showDetail(country)}>show</button>
    </p>
)

export default Country
