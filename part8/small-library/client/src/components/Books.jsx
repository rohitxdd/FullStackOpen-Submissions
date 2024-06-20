import { gql, useQuery } from "@apollo/client"
import { useState } from "react"

const ALL_BOOKS = gql`
query Query($genre: String) {
  allBooks(genre: $genre) {
    author {
      name
    }
    title
    published
    genres
  }
  allgenres
}
`
const Books = () => {
  const [selectedGenres, setSelectedGenres] = useState(null)
  const { loading, data, error } = useQuery(ALL_BOOKS, { variables: { genre: selectedGenres } })

  if (loading) {
    return <h2>Loading...</h2>
  }

  if (error) {
    return <h2>Something went wrong!!!</h2>
  }

  const handleGenresSelection = (genre) => {
    setSelectedGenres(genre)
  }

  return (
    <div>
      <h2>books</h2>
      {selectedGenres && <h3>in genre <strong>{selectedGenres}</strong></h3>}
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

      {data.allgenres.map(e => (<button key={e} onClick={() => handleGenresSelection(e)}>{e}</button>))}
      <button onClick={() => handleGenresSelection(null)}>all genres</button>

    </div>
  )
}

export default Books
