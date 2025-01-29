import Weather from "./Weather";

const CountryDetails = ({ countryDetails }) => {
    console.log('CountryDetails: ', countryDetails);
    const lat = countryDetails.capitalInfo.latlng[0]
    const lng = countryDetails.capitalInfo.latlng[1]
    return (
        <div>
            <h1>{countryDetails.name.common}</h1>
            <div>capital {countryDetails.capital}</div>
            <div>area {countryDetails.area}</div>
            <h3>languages:</h3>
            <ul>
                {Object.values(countryDetails.languages).map((language, index) => (
                <li key={index}>{language}</li>
                ))}
            </ul>
            <img
            src={countryDetails.flags.png}
            alt={countryDetails.flags.alt}
            height="150"
            width="auto"
            />

            <Weather city={countryDetails.capital} lat={lat} lng={lng}/>
        </div>

        
    )
}

export default CountryDetails