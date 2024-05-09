import { useState } from "react";
import BlogList from "../components/BlogList";
import { useNavigate } from "react-router-dom";
import CreateBlog from "../components/CreateBlog";
import { getAllBlog } from "../services/blogs";
import { useQuery } from "@tanstack/react-query"

export default function Home() {
  const navigate = useNavigate();
  const [formVisible, setFormVisibility] = useState(false);

  const { data, isError, isLoading } = useQuery({
    queryKey: ['blog'],
    queryFn: getAllBlog,
  })

  function sortByLikes(res) {
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

  const blogs = sortByLikes(data)

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
