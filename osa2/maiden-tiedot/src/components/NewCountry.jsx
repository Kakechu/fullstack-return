

import CountryDetails from './CountryDetails'

const Country = ({countriesToShow, countryDetails, setSelectedCountry, selectedCountry}) => {
    console.log("Country-komponentti renderöityy!", { countriesToShow, selectedCountry, countryDetails });
    if (countriesToShow.length > 10 ) {
        return (
            <div>
                Too many matches, specify another filter
            </div>
        )
    }

    if (countriesToShow.length > 1 && countriesToShow.length <= 10) {
        return (
            <div>
              {countriesToShow.map(countryToShow => (
                <div key={countryToShow}>
                  {countryToShow} <button onClick={() => setSelectedCountry(countryToShow)}>show</button>
                </div>
              ))}
            </div>
          )
    }

    // ((countriesToShow.length === 1 || selectedCountry) && countryDetails)
    if ((countriesToShow.length === 1 || selectedCountry) && countryDetails) {
        console.log("päästänkö tänne")
        return <CountryDetails countryDetails={countryDetails}/>
    }

    return null

}

export default Country

/*

    if (countriesToShow.length > 1 && countriesToShow.length <= 10) {
        return (
            <div>
              {countriesToShow.map(countryToShow => (
                <div key={countryToShow}>
                  {countryToShow} <button onClick={() => setSelectedCountry(countryToShow)}>show</button>
                </div>
              ))}
            </div>
          )
    }

*/