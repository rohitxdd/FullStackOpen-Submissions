import { useState } from "react";
import propTypes from "prop-types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { IncrementLikeOfBlog, RemoveBlogByID } from "../services/blogs";
import { useNotification } from "../context/NotificationContext";

const blogStyle = {
  border: "1px solid black",

  padding: "5px 10px",
  margin: "10px",
};

const Blog = ({ data, username }) => {
  const [showDetail, setShowDetail] = useState();
  const { setNotification } = useNotification()
  const queryClient = useQueryClient();

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

  return (
    <div style={blogStyle}>
      <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
        <h3>
          <strong data-testid="blog-title">{data.title} </strong>
        </h3>
        <div>
          <button
            data-testid="toggleButton"
            onClick={() => setShowDetail(!showDetail)}
          >
            {showDetail ? "Hide" : "View"}
          </button>
        </div>
      </div>

      {showDetail && (
        <div style={{ display: "block" }}>
          <p data-testid="blog-url">{data.url}</p>
          <p data-testid="blog-likes">
            Likes {data.likes}{" "}
            <button
              data-testid="button-like"
              onClick={() => likeMutation.mutate(data.id)}
            >
              Like
            </button>
          </p>
          <p data-testid="blog-author">{data.author}</p>

          {data.user?.username === username && (
            <button
              data-testid="blog-remove"
              onClick={() => {
                if (confirm(`Remove blog ${data.title} by ${data.author}`)) {
                  removeMutation.mutate(data.id)
                }
              }}
            >
              Remove
            </button>
          )}
        </div>
      )}
    </div>
  );
};

Blog.propTypes = {
  data: propTypes.object.isRequired,
  username: propTypes.string.isRequired,
};

export default Blog;
