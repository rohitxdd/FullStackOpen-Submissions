import { gql, useApolloClient, useMutation, useQuery } from "@apollo/client"
import { useState } from "react"
import { Navigate, useNavigate } from "react-router-dom"

const ALL_AUTHORS = gql`
query {
  allAuthors {
    name
  }
}
`

const UPDATE_YEAR = gql`

mutation EditAuthor($name: String!, $setBornTo: Int!) {
    editAuthor(name: $name, setBornTo: $setBornTo) {
      name
    }
  }

`

export default function UpdateBirth() {
    const { loading, data } = useQuery(ALL_AUTHORS)
    const [author, setAuthor] = useState("")
    const [year, setYear] = useState("")
    const navigate = useNavigate()
    const client = useApolloClient()
    const [mutateFunction, { data: submitdata, loading: submitting, error: submitError }] = useMutation(UPDATE_YEAR, {
        onCompleted: () => {
            client.refetchQueries({
                include: "active"
            })
        }
    })

    if (submitdata) {
        return <Navigate to="/authors" replace />
    }

    if (submitError) {
        return <h2>{`Error submitting ${submitError.message}`}</h2>
    }

    if (submitting) {
        return <h2>Submitting...</h2>
    }

    if (loading) {
        return <h2>loading...</h2>
    }

    function handleChange(e) {
        const { value } = e.target
        const pattern = /^\d+$/;
        if (pattern.test(value) && value.length <= 4) {
            setYear(value)
        }
    }

    function handleSubmit() {
        if (author && year) {
            mutateFunction({ variables: { name: author, setBornTo: Number(year) } })
        }
    }

    return (
        <>
            <h2>Set Birth Year</h2>
            <div style={{ display: "grid", gridTemplateColumns: "auto auto", gap: "2px", maxWidth: "200px" }}>
                <span>Name:</span>
                <select onChange={(e) => setAuthor(e.target.value)} value={author}>
                    <option value="">--select--</option>
                    {data?.allAuthors?.map(e => (<option key={e.name} value={e.name}>{e.name}</option>))}
                </select>
                <span>Born: </span>
                <input type="text" onChange={handleChange} value={year} />
            </div>
            <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
                <button onClick={handleSubmit}>Submit</button>
                <button onClick={() => navigate("/authors")}>Back</button>
            </div>
        </>
    )
}