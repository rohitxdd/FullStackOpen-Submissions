import { useNavigate } from "react-router-dom"
import { getAllUsers } from "../services/userService"
import { useQuery } from '@tanstack/react-query'

export default function Users() {
    const navigate = useNavigate()

    const query = useQuery({
        queryKey: ['users'],
        queryFn: getAllUsers,
    })

    if (query.isLoading) {
        return <h2>Loading...</h2>
    }

    if (query.isError) {
        return <h2>Something is wrong</h2>
    }

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Blogs Created</th>
                    </tr>
                </thead>
                <tbody>
                    {query.data.map(e => {
                        return <tr key={e.id}>
                            <td onClick={() => navigate(`./${e.id}`)} style={{ cursor: "pointer" }}>{e.name.toUpperCase()}</td>
                            <td>{e.blogs}</td>
                        </tr>
                    })}
                </tbody>
            </table>
        </div>
    )
}