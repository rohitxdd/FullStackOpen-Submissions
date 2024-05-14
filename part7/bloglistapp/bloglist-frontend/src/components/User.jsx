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
            <div className="mx-10 space-y-2">
                <h1 className="text-2xl font-bold">user - {data.name}</h1>
                <h2 className="text-lg">added Blogs</h2>
                <ul className="list-disc ml-10">
                    {data.blogs.map(e => (<li key={e.id}>{e.title}</li>))}
                </ul>
            </div>
        </>
    )
}
