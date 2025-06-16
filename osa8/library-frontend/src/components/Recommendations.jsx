import { useQuery } from '@apollo/client'
import { ALL_BOOKS, CURRENT_USER } from '../queries'
import { useState } from 'react'

const Recommendations = (props) => {
  const result = useQuery(ALL_BOOKS)
  const userResult = useQuery(CURRENT_USER)

  if (!props.show) {
    return null
  }

  if (result.loading || userResult.loading) {
    return <div>loading...</div>
  }

  const books = result.data.allBooks
  const user = userResult.data.me

  //

  if (!user.favoriteGenre) {
    return <div>Your profile doesn't have a favorite genre set.</div>
  }
  const favorite = user.favoriteGenre

  const booksToShow = books.filter((book) => book.genres.includes(favorite))

  return (
    <div>
      <h2>recommendations</h2>

      <div>
        books in your favorite genre <strong>{favorite}</strong>
      </div>
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
    </div>
  )
}

export default Recommendations
