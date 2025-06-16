import { useState, useEffect } from 'react'
import { useMutation, useQuery } from '@apollo/client'

import { ALL_AUTHORS, EDIT_AUTHOR } from '../queries'

const YearForm = () => {
  const [name, setName] = useState('')
  const [year, setYear] = useState('')

  const [changeYear] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  })

  const result = useQuery(ALL_AUTHORS)

  if (result.loading || !result.data) {
    return <div>loading...</div>
  }

  const authors = result.data.allAuthors

  const submit = async (event) => {
    event.preventDefault()

    changeYear({ variables: { name, born: Number(year) } })
    setName('')
    setYear('')
  }

  return (
    <div>
      <h2>Set birthyear</h2>

      <form onSubmit={submit}>
        <select value={name} onChange={({ target }) => setName(target.value)}>
          <option value="">-- select author --</option>
          {authors.map((a) => (
            <option key={a.name}>{a.name}</option>
          ))}
        </select>

        <div>
          year
          <input
            value={year}
            onChange={({ target }) => setYear(target.value)}
          />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  )
}

export default YearForm
