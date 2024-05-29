import { gql, useQuery } from "@apollo/client"

const ALL_BOOKS = gql`
query{
  allBooks {
    title
    author
    published
  }
}
`
const Books = () => {
  const { loading, data, error } = useQuery(ALL_BOOKS)

  if (loading) {
    return <h2>Loading...</h2>
  }

  if (error) {
    console.error(error)
    return <h2>Something went wrong!!!</h2>
  }

  return (
    <div>
      <h2>books</h2>

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
              <td>{a.author}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Books
