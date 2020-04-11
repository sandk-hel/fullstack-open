import React from 'react'
import Language from './Language'

const Languages = ({ languages }) => (
    <div>
        <h3>Languages</h3>
        <ul>
            {languages.map(language => <Language key={language.iso639_1} language={language} />)}
        </ul>
    </div>
)

export default Languages
