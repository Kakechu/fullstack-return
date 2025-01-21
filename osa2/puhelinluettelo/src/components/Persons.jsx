const Persons = ({persons, newFilter, deletePerson}) => {
  return (
    <div>
      {persons
        .filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()))
        .map(person =>
          <div key={person.name}>
            {person.name} {person.number} <button data-id={person.id} onClick={deletePerson}>delete</button>
          </div>
        )
      }
    </div>
  )
}

export default Persons

//{person.name} {person.number} <button data-id={person.id} onClick={handleDelete}>delete</button>
//<p key={person.name}>{person.name} {person.number}</p>