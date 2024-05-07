import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router-dom"
import { getUserAllBlogs } from "../services/userService"

export default function User() {
    const { id } = useParams()

    const { data, isError, isLoading } = useQuery({
        queryKey: [id],
        queryFn: getUserBlogs,
        staleTime: 60000
    })

    async function getUserBlogs() {
        return getUserAllBlogs(id)
    }

    if (isLoading) {
        return <h2>Loading...</h2>
    }

    if (isError) {
        return <h2>Something is wrong!!!</h2>
    }

    if (!data) {
        return <h3>No User Found</h3>
    }


    return (
        <>
            <h1>{data.name}</h1>
            <h2>added Blogs</h2>
            <ul>
                {data.blogs.map(e => (<li key={e.id}>{e.title}</li>))}
            </ul>
        </>
    )
}
