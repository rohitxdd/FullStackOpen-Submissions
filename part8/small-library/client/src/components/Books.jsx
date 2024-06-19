import { gql, useQuery } from "@apollo/client"
import { useState } from "react"

const ALL_BOOKS = gql`
query{
  allBooks {
    author {
      name
    }
    title
    published
    genres
  }
}
`
const Books = () => {
  const { loading, data, error } = useQuery(ALL_BOOKS)
  const [selectedGenres, setSelectedGenres] = useState(null)
  if (loading) {
    return <h2>Loading...</h2>
  }

  if (error) {
    return <h2>Something went wrong!!!</h2>
  }

  const arrOfGenres = []

  data.allBooks.forEach(e => {
    arrOfGenres.push(...e.genres)
  })

  const uniqueGenres = Array.from(new Set(arrOfGenres))

  const filterData = selectedGenres ? data.allBooks.filter(e => e.genres.includes(selectedGenres)) : data.allBooks

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
          {filterData.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {uniqueGenres.map(e => (<button key={e} onClick={() => handleGenresSelection(e)}>{e}</button>))}
      <button onClick={() => handleGenresSelection(null)}>all genres</button>

    </div>
  )
}

export default Books
