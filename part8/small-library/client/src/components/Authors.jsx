import { gql, useQuery } from "@apollo/client"
import { useNavigate } from "react-router-dom"
import { UserContext } from "../hooks/UserContext"
import { useContext } from "react";

const ALL_AUTHORS = gql`
query {
  allAuthors {
    name
    born
    bookCount
  }
}
`

const Authors = () => {
  const navigate = useNavigate()
  const { user } = useContext(UserContext)

  const { loading, data, error } = useQuery(ALL_AUTHORS)
  if (loading) {
    return <h2>Loading...</h2>
  }

  if (error) {
    console.log(error)
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {data.allAuthors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {user &&
        <button onClick={() => navigate("/update-birth")}>Update birth Year</button>
      }
    </div>
  )
}

export default Authors
