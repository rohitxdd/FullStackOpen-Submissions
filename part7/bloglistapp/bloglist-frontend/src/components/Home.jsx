import { useState } from "react";
import BlogList from "./BlogList";
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

  if (isLoading) {
    return <h2>Loading...</h2>
  }

  return (
    <div>
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
