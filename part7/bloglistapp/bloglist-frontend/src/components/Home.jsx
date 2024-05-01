import { useEffect, useState } from "react";
import UserSection from "./UserSection";
import BlogList from "./BlogList";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import CreateBlog from "./CreateBlog";
import { getAllBlog } from "../services/blogs";
import { useQuery } from "@tanstack/react-query"

export default function Home() {
  const navigate = useNavigate();
  const [formVisible, setFormVisibility] = useState(false);

  const { data: blogs, isError, isLoading } = useQuery({
    queryKey: ['blog'],
    queryFn: getBlogs,
  })

  async function getBlogs() {
    const res = await getAllBlog();
    if (res && res.length > 0) {
      res.sort((a, b) => b.likes - a.likes);
      return res
    }
  }

  if (isError) {
    navigate("/")
  }

  useEffect(() => {
    const checkToken = () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const decode = jwtDecode(token);
          const expDate = new Date(decode.exp * 1000);
          if (expDate < new Date()) {
            navigate("/");
          }
        } catch {
          navigate("/");
        }
      } else {
        navigate("/");
      }
    };
    checkToken();
  }, []);

  if (isLoading) {
    return <h2>Loading...</h2>
  }

  return (
    <div>
      <h1>Blogs</h1>
      <UserSection />
      {formVisible ? (
        <CreateBlog setFormVisibility={setFormVisibility} />
      ) : (
        <button onClick={() => setFormVisibility(true)}>New Blog</button>
      )}
      <BlogList
        blogs={blogs ?? []}
      />
    </div>
  );
}
