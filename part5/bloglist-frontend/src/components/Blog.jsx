import { useState } from "react";
import propTypes from 'prop-types'

const blogStyle = {
  border: "1px solid black",

  padding: "5px 10px",
  margin: "10px",
};

const Blog = ({ data, IncrementLike, username, RemoveBlog }) => {
  const [showDetail, setShowDetail] = useState();
  return (
    <div style={blogStyle}>
      <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
        <h3>
          <strong>{data.title} </strong>
        </h3>
        <div>
          <button onClick={() => setShowDetail(!showDetail)}>
            {showDetail ? "Hide" : "View"}
          </button>
        </div>
      </div>

      {showDetail && (
        <div style={{ display: "block" }}>
          <p>{data.url}</p>
          <p>
            Likes {data.likes}{" "}
            <button onClick={() => IncrementLike(data.id)}>Like</button>
          </p>
          <p>{data.author}</p>

          {data.user.username === username && (
            <button
              onClick={() => {
                if (confirm(`Remove blog ${data.title} by ${data.author}`)) {
                  RemoveBlog(data.id);
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
  data : propTypes.object.isRequired,
  IncrementLike : propTypes.func.isRequired,
  username : propTypes.string.isRequired,
  RemoveBlog : propTypes.func.isRequired
}


export default Blog;
