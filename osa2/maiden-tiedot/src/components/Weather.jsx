import React, { useState, useEffect } from 'react'
import axios from 'axios'


const Weather = ({city, lat, lng}) => {

    const [weatherData, setWeatherData] = useState(null)

    useEffect(() => {

        if (!city) {
            setWeatherData(null)
            return null
        }
        
        const apiKey = import.meta.env.VITE_SOME_KEY

        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${apiKey}&units=metric`
        console.log(url)

        axios
          .get(url)
          .then((response) => {
            console.log("menee responseen")
            setWeatherData(response.data)
          })
          .catch(() => console.log("error"))

    }, [city])

    if (!weatherData) {
        return null
    }

    console.log(weatherData)
    const saatiedot = weatherData
    console.log("säätiedot:", saatiedot)
    const icon = weatherData.weather[0].icon
    console.log("sääikonin koodi: ", icon)

    return (
        <div>
            <h2>Weather in {city}</h2>
            <p>temperature {weatherData.main.temp} Celsius</p>
            <img src={`https://openweathermap.org/img/wn/${icon}@2x.png`} alt="Weather icon"/>
            <p>wind {weatherData.wind.speed} m/s</p>
        </div>
    )

}

export default Weather