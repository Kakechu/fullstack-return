import { useEffect, useState } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'


const App = () => {

  const [persons, setPersons] = useState([])

  const [newName, setNewName] = useState('')

  const [newNumber, setNewNumber] = useState('')

  const [newFilter, setNewFilter] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, []
  )

  
  const addPerson = (event) => {
    event.preventDefault()
    console.log("uusi nimi: ", newName)

    const names = persons.map(person => person.name)

    if (names.includes(newName)) {
      window.alert(`${newName} is already added to the phonebook`)
      return
    }

    const newPerson = {
      name: newName,
      number: newNumber
    }

    personService
      .create(newPerson)
      .then(returnedPerson => {
        console.log(newPerson)
        console.log(returnedPerson)
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
      })
  }

  const deletePerson = (event) => {
    const idToRemove = event.target.dataset.id
    const personToRemove = persons.find(person => person.id === idToRemove)

    if (!window.confirm(`Delete ${personToRemove.name}?`)) {
      console.log("cancelling")
      return
    }

    console.log("deleting")

    personService
      .remove(idToRemove)
      .then((deletedPerson) =>  {
        console.log("Deleted:", deletedPerson)
        setPersons(persons.filter(person => person.id !== idToRemove))

      })
  }

  

  const handleNameChange = (event) => {
    //console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    //console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    //console.log(event.target.value)
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

      <Persons
        persons={persons}
        newFilter={newFilter}
        deletePerson={deletePerson}
      />
    </div>
  )

}

export default App