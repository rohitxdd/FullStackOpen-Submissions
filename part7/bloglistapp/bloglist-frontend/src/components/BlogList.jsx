import { useNavigate } from "react-router-dom";

export default function BlogList({ blogs }) {
  const navigate = useNavigate();
  return (
    <>
      {blogs.length > 0 ? (
        <div className="blogs">
          {blogs.map((blog) => (
            <div key={blog.id} style={{ textDecoration: 'underline', cursor: "pointer", letterSpacing: "1px" }} onClick={() => navigate(`/blog/${blog.id}`)}>
              <h3>
                <strong data-testid="blog-title">{blog.title} </strong>
              </h3>
            </div>
          ))}
        </div >
      ) : (
        <>
          <h2>No Blogs to Show</h2>
        </>
      )
      }
    </>
  );
}
