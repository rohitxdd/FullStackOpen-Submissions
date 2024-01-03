import Blog from "./Blog";

export default function BlogList({ blogs, IncrementLike, RemoveBlog }) {
  const username = localStorage.getItem('username')
  return (
    <>
      {blogs.length > 0 ? (
        <>
          {blogs.map((blog) => (
            <Blog key={blog.id} data={blog} IncrementLike={IncrementLike} username={username} RemoveBlog={RemoveBlog} />
          ))}
        </>
      ) : (
        <>
          <h2>No Blogs to Show</h2>
        </>
      )}
    </>
  );
}
