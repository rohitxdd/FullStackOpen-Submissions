import { useMessage } from "../services/MessageContext";
import { CreateNewBlog } from "../services/blogs";
import BlogForm from "./BlogForm";

export default function CreateBlog({ setBlogs, setFormVisibility }) {
  const { showMessage } = useMessage();

  async function createBlog(inputs) {
    const response = await CreateNewBlog(inputs);
    if (response?.title) {
      setBlogs((prev) => [...prev, response]);
      showMessage({
        text: `A new Blog ${response.title} added`,
        status: "success",
      });
      setFormVisibility(false);
    } else {
      showMessage({ text: "something went wrong", status: "error" });
    }
  }

  return (
    <BlogForm createBlog={createBlog} setFormVisibility={setFormVisibility} />
  );
}
