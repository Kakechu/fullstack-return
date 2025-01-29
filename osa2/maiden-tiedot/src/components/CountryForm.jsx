const CountryForm = ({value, onChange}) => {
    return (
      <form>
        <div>
          find countries
          <input
            value={value}
            onChange={onChange}
          />
        </div>
        
      </form>
    )
}

export default CountryForm