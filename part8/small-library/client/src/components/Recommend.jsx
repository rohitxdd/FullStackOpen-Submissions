import { useContext } from 'react'
import { UserContext } from "../hooks/UserContext"
import { Navigate } from 'react-router-dom'
import { gql, useQuery } from "@apollo/client"

const RECOMMENDED_BOOKS = gql`
query Query($genre: String) {
  allBooks(genre: $genre) {
    author {
      name
    }
    title
    published
    genres
  }
}`

export default function Recommend() {
  const { user } = useContext(UserContext)
  const { loading, data, error } = useQuery(RECOMMENDED_BOOKS, { variables: { genre: user?.favoriteGenre } })

  if (!user) {
    return <Navigate to={"/login"} replace />
  }

  if (loading) {
    return <h3>Loading...</h3>
  }

  if (error) {
    return <h3>Something went wrong!</h3>
  }

  return (
    <>
      <h2>Recommendations</h2>
      <h4>Books in your favourite genre {user?.favoriteGenre}</h4>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {data.allBooks.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}
