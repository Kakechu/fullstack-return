const NewCountry = ({countriesToShow, setSelectedCountry}) => {
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

export default NewCountry