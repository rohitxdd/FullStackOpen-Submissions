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
        <div className="flex justify-center">
            <div className="grid grid-cols-2 mx-10 sm:max-w-lg mt-8">
                <div className="font-semibold antialiased text-xl">Name</div>
                <div className="font-semibold antialiased text-xl">Blogs Created</div>
                {query.data.map(e => {
                    return <>
                        <div onClick={() => navigate(`./${e.id}`)} style={{ cursor: "pointer" }}>{e.name.toUpperCase()}</div>
                        <div>{e.blogs}</div>
                    </>
                })}
            </div>
        </div>
    )
}
