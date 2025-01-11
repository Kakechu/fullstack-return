import { useState } from 'react'


const Filter = ({value, onChange}) => {
  return (
    <div>
      filter shown with
      <input
        value={value}
        onChange={onChange}
      />
    </div>
  )
}

const PersonForm = ({newName, handleNameChange, newNumber, handleNumberChange, addPerson}) => {
  
  return (
    <form onSubmit={addPerson}>
    <div>
      name:
      <input 
        value={newName}
        onChange={handleNameChange}
      />
    </div>
    <div>
      number:
      <input
        value={newNumber}
        onChange={handleNumberChange}
      />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
  )
}

const Persons = ({persons, newFilter}) => {
  return (
    <div>
      {persons
        .filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()))
        .map(person =>
          <p key={person.name}>{person.name} {person.number}</p>
        )
      }
    </div>
  )
}


const App = () => {
  const [persons, setPersons] = useState([
    /*
    {
      name: 'Arto Hellas',
      number: '040-1231244'    
    }
    */
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 

  const [newName, setNewName] = useState('')

  const [newNumber, setNewNumber] = useState('')

  const [newFilter, setNewFilter] = useState('')

  
  const addPerson = (event) => {
    event.preventDefault()
    console.log("uusi nimi: ", newName)

    const newPerson = {
      name: newName,
      number: newNumber
    }
    const names = persons.map(person => person.name)

    if (names.includes(newPerson.name)) {
      window.alert(`${newName} is already added to the phonebook`)
    } else {
      setPersons(persons.concat(newPerson))
      setNewName('')
      setNewNumber('')
      console.log(persons)
    }
  }
  

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setNewFilter(event.target.value)
  }


  return (
    <div>
      <h2>Phonebook</h2>

      <Filter value={newFilter} onChange={handleFilterChange}/>
      
      <h3>add a new</h3>

      <PersonForm
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
        addPerson={addPerson}
      />
      
      <h2>Numbers</h2>

      <Persons persons={persons} newFilter={newFilter}/>
    </div>
  )

}

export default App