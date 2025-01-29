import {useState, useEffect} from 'react'
import CountryForm from './components/CountryForm'
import axios from 'axios'
import Country from './components/Country'
import CountryDetails from './components/CountryDetails'
import Weather from './components/Weather'

const App = () => {
  const [country, setCountry] = useState('')
  const [countriesToShow, setCountriesToShow] = useState([])
  const [countryDetails, setCountryDetails] = useState(null)
  const [selectedCountry, setSelectedCountry] = useState(null)

  const handleCountryChange = (event) => {
    console.log(event.target.value)
    setCountry(event.target.value)
  }


  // Haetaan maat ja suodatetaan ne
  useEffect(() => {
    // Jos kenttä on tyhjä, tyhjennetään näytettävät maat
    if (!country) {
      setCountriesToShow([])
      return
    }

    axios
    .get("https://studies.cs.helsinki.fi/restcountries/api/all")
    .then(response => {
      const countryNames = response.data.map(country => country.name.common)
      const filtered = countryNames.filter(name =>
        name.toLowerCase().includes(country.toLowerCase())
      )
      setCountriesToShow(filtered)
      setCountryDetails(null) //poistetaan aiemmin ladatut tiedot
    })
  }, [country]) // Tämä efekti toteutetaan, kun countryssä (hakukenttä) tapahtuu muutos


  // Haetaan yhden maan tiedot, kun listalla olisi vain yksi maa
  useEffect(() => {
    if (countriesToShow.length === 1) {
      const countryToShow = countriesToShow[0]

      axios
        .get(`https://studies.cs.helsinki.fi/restcountries/api/name/${countryToShow}`)
        .then(response => {
          console.log(response.data)
          console.log(response.data.name.common)
          setCountryDetails(response.data)
        })
    } else {
      setCountryDetails(null)
    }
  }, [countriesToShow]
  )

  // Haetaan maan tiedot, jos se valitaan klikkaamalla
  useEffect(() => {
    if (selectedCountry) {
      console.log("Haetaan tiedot maalle:", selectedCountry)
      axios
        .get(`https://studies.cs.helsinki.fi/restcountries/api/name/${selectedCountry}`)
        .then(response => {
          console.log("Saatiin data:", response.data);
          setCountryDetails(response.data)
          setCountriesToShow([selectedCountry])
        })
    }
  }, [selectedCountry])





  return (
    <div>
      <CountryForm value={country} onChange={handleCountryChange}/>
      {countriesToShow.length > 10 && <div>Too many matches, specify another filter</div>}
      {countriesToShow.length > 1 && countriesToShow.length <= 10 && (
        <Country countriesToShow={countriesToShow} setSelectedCountry={setSelectedCountry} />
      )}
      {(countriesToShow.length === 1 || selectedCountry) && countryDetails && (
        <div>
          <CountryDetails countryDetails={countryDetails} />

        </div>
      )}
    </div>
  )
}


export default App