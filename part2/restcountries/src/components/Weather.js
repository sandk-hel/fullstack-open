import React, { useState, useEffect } from 'react'
import axios from 'axios'

let Weather = ({ capital }) => {
    const [current, setCurrent] = useState()

    const apiKey = process.env.REACT_APP_API_KEY
    const params = {
        params: {
            access_key: apiKey,
            query: capital
        }
    }

    let effect = () => {
                        axios
                            .get("http://api.weatherstack.com/current", params)
                            .then(response => {
                                setCurrent(response.data.current)
                            })
                        }
    useEffect(effect, [])
    if (current === undefined) {
        return <h4>Loading weather ... </h4>
    }
    return  (
        <div>
            <h3>Weather in {capital}</h3>
            <p>temperature: {current.temperature} Celsius</p>
            <img alt="Weather in {capital}" src={current.weather_icons[0]} />
            <p>wind: {current.wind_speed} mph direction {current.wind_dir}</p>
        </div>
    )
}

export default Weather