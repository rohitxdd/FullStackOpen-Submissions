import { gql, useMutation, useApolloClient } from "@apollo/client"
import { useState } from 'react'
import { Navigate } from "react-router-dom"


const ADD_BOOK = gql`
mutation AddBook($title: String!, $published: Int!, $genres: [String!]!, $author: String!) {
  addBook(title: $title, published: $published, genres: $genres, author: $author) {
    title
    author
    published
  }
}
`


const NewBook = () => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])

  const client = useApolloClient()

  const [createBook, { data, loading, error }] = useMutation(ADD_BOOK, {
    onCompleted: () => {
      console.log("refetching all queries...")
      client.refetchQueries({
        include: "all"
      })
    }
  })

  if (loading) return "submitting..."
  if (error) return `Submission error ${error.message}`
  if (data) {
    return <Navigate to="/" replace />
  }

  const submit = async (event) => {
    event.preventDefault()

    if (title && author && published && genres.length > 0) {
      console.log('add book...')
      createBook({ variables: { title, author, published: Number(published), genres } })
      setTitle('')
      setPublished('')
      setAuthor('')
      setGenres([])
      setGenre('')
    }
  }

  const addGenre = () => {
    setGenres(genres.concat(genre))
    setGenre('')
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          published
          <input
            type="number"
            value={published}
            onChange={({ target }) => setPublished(target.value)}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">
            add genre
          </button>
        </div>
        <div>genres: {genres.join(' ')}</div>
        <button type="submit">create book</button>
      </form>
    </div>
  )
}

export default NewBook