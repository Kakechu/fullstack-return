import { useQuery } from '@apollo/client'
import { ALL_BOOKS, BOOKS_BY_GENRE } from '../queries'
import { useState } from 'react'

const Books = (props) => {
  const result = useQuery(ALL_BOOKS)
  const [filter, setFilter] = useState('')
  const {
    loading: genreLoading,
    error: genreError,
    data: genreData,
  } = useQuery(BOOKS_BY_GENRE, {
    variables: { genre: filter },
    skip: filter === '',
  })

  if (!props.show) {
    return null
  }

  if (result.loading || genreLoading) {
    return <div>loading...</div>
  }

  const books = result.data.allBooks

  const allGenres = books.flatMap((b) => b.genres)

  const genres = [...new Set(allGenres)]

  const booksToShow =
    filter === '' ? books : genreData ? genreData.allBooks : []

  return (
    <div>
      <h2>books</h2>
      {filter !== '' ? (
        <div>
          in genre <strong>{filter}</strong>
        </div>
      ) : (
        <></>
      )}
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {booksToShow.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        {genres.map((g) => (
          <button key={g} onClick={() => setFilter(g)}>
            {g}
          </button>
        ))}
        <button onClick={() => setFilter('')}>all genres</button>
      </div>
    </div>
  )
}

export default Books
