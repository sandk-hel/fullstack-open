import React from 'react'

const Filter = ({ searchText, onChange }) => (
    <>
        find countries
        <input value={searchText} onChange={onChange} />
    </>
)

export default Filter
