import { CreateNewBlog } from "../services/blogs";
import BlogForm from "./BlogForm";
import { setNotification } from "../reducers/notificationReducer";
import { useDispatch } from "react-redux";
import { addBlog } from "../reducers/blogReducer"

export default function CreateBlog({ setFormVisibility }) {
  const dispatch = useDispatch()
  async function createBlog(inputs) {
    const response = await CreateNewBlog(inputs);
    if (response?.title) {
      dispatch(addBlog(response))
      dispatch(setNotification({
        text: `A new Blog ${response.title} added`,
        status: "success",
      }));
      setFormVisibility(false);
    } else {
      dispatch(setNotification({ text: "something went wrong", status: "error" }));
    }
  }

  return (
    <BlogForm createBlog={createBlog} setFormVisibility={setFormVisibility} />
  );
}
