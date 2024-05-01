import Blog from "./Blog";

export default function BlogList({ blogs }) {
  const username = localStorage.getItem("username");
  return (
    <>
      {blogs.length > 0 ? (
        <div className="blogs">
          {blogs.map((blog) => (
            <Blog
              key={blog.id}
              data={blog}
              username={username}
            />
          ))}
        </div>
      ) : (
        <>
          <h2>No Blogs to Show</h2>
        </>
      )}
    </>
  );
}
