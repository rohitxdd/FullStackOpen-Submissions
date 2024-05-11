import { useNavigate } from "react-router-dom";

export default function BlogList({ blogs }) {
  const navigate = useNavigate();
  return (
    <>
      {blogs.length > 0 ? (
        <div className="blogs">
          <h1 className="text-2xl font-semibold text-slate-700 subpixel-antialiased leading-loose">Added blogs:</h1>
          <ul className="list-decimal p-2 mx-5 font-medium text-lg">
            {blogs.map((blog) => (
              <li className="hover:underline underline-offset-2" key={blog.id} >
                <span className="cursor-pointer" onClick={() => navigate(`/blog/${blog.id}`)}>
                  {blog.title}
                </span>
              </li>
            ))}
          </ul>
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
