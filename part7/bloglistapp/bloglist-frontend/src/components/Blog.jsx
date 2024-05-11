import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { IncrementLikeOfBlog, RemoveBlogByID, addNewComment, getAllBlog } from "../services/blogs";
import { useNotification } from "../context/NotificationContext";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { useState } from "react";

const Blog = () => {
  const { setNotification } = useNotification()
  const queryClient = useQueryClient();
  const { id } = useParams();
  const { state: { username } } = useUser()
  const navigate = useNavigate()
  const [comment, setComment] = useState("")

  const { data, isLoading } = useQuery({
    queryKey: ['blog'],
    queryFn: getAllBlog,
  })

  const likeMutation = useMutation({
    mutationFn: IncrementLikeOfBlog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blog'] })
    }
  })

  const removeMutation = useMutation({
    mutationFn: RemoveBlogByID,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blog'] })
      setNotification({ text: "Blog deleted", status: "success" });
    }
  })

  const { mutate: addComment } = useMutation({
    mutationFn: addNewComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blog'] })
      setNotification({ text: "Comment added", status: "success" });
      setComment("")
    }
  })

  if (isLoading) {
    return <h2>Loading...</h2>
  }
  const blog = data.find(e => e.id === id)

  if (!blog) {
    return <Navigate to={"/home"} />
  }

  function handleCommentSubmit() {
    if (comment.length > 0) {
      addComment({ id, comment })
    }
  }

  return (
    <div className="flex flex-col sm:px-10 sm:mx-10 px-2 mt-4 space-y-2">
      <div className="justify-between flex">
        <p className="text-3xl font-bold underline underline-offset-4 subpixel-antialiased text-slate-700">{blog.title}</p>
        <button className="text-white bg-slate-500 hover:bg-slate-600 px-5 rounded-md" onClick={() => navigate("/home")}>Back</button>
      </div>
      <div>
        <a data-testid="blog-url" href="#" className="font-mono underline text-blue-950 font-semibold">{blog.url}</a>
        <div className="flex space-x-2 items-center text-lg">
          <p className="font-mono">{blog.likes}</p>{" "}
          <p>Likes</p>
          <button
            data-testid="button-like"
            onClick={() => likeMutation.mutate(blog.id)}
            className="text-white bg-sky-600 hover:bg-sky-800 px-5 rounded-md"
          >
            Like
          </button>

        </div>
        <p data-testid="blog-author" className="text-lg">by - {blog.author}</p>
        <div>
          {blog.user?.username === username && (
            <button
              className="text-white bg-red-500 hover:bg-red-600 px-5 rounded-md"
              data-testid="blog-remove"
              onClick={() => {
                if (confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
                  removeMutation.mutate(blog.id)
                }
              }}
            >
              Remove
            </button>
          )}
        </div>
      </div>
      <h2 className="text-xl font-semibold">Comments</h2>
      <div className="flex sm:max-w-lg gap-3">
        <input type="text"
          className="bg-gray-50 flex-grow border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5"
          placeholder="add new comment" value={comment} onChange={(e) => setComment(e.target.value)} />
        <button className="text-white bg-violet-500 hover:bg-violet-600 px-5 rounded-md" onClick={handleCommentSubmit}>Add Comment</button>
      </div>
      <ul className="list-disc ml-8">
        {blog.comments.map((e, i) => {
          return <li key={i}>{e}</li>
        })}
      </ul>
    </div>
  );
};


export default Blog;
