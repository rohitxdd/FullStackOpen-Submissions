import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { IncrementLikeOfBlog, RemoveBlogByID, addNewComment, getAllBlog } from "../services/blogs";
import { useNotification } from "../context/NotificationContext";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { useState } from "react";

const blogStyle = {
  border: "1px solid black",
  padding: "5px 10px",
  margin: "10px",
};

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
    <div style={blogStyle}>
      <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
        <h3>
          <strong data-testid="blog-title">{blog.title} </strong>
        </h3>
      </div>
      <div style={{ display: "block" }}>
        <p data-testid="blog-url">{blog.url}</p>
        <p data-testid="blog-likes">
          Likes {blog.likes}{" "}
          <button
            data-testid="button-like"
            onClick={() => likeMutation.mutate(blog.id)}
          >
            Like
          </button>
        </p>
        <p data-testid="blog-author">{blog.author}</p>
        <div style={{ display: "flex", gap: "1rem" }}>
          {blog.user?.username === username && (
            <button
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
          <button onClick={() => navigate("/home")}>Back</button>
        </div>
      </div>
      <h2>Comments</h2>
      <input type="text" placeholder="add new comment" value={comment} onChange={(e) => setComment(e.target.value)} />
      <button onClick={handleCommentSubmit}>Add Comment</button>
      <ul>
        {blog.comments.map((e, i) => {
          return <li key={i}>{e}</li>
        })}
      </ul>
    </div>
  );
};


export default Blog;
