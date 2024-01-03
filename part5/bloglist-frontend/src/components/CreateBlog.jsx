import { useRef } from "react";
import { useMessage } from "../services/MessageContext";
import { CreateNewBlog } from "../services/blogs";

const formStyle = {
  margin: "5px",
};

export default function CreateBlog({ setBlogs, setFormVisibility }) {
  const { showMessage } = useMessage();
  const titleRef = useRef(null);
  const authorRef = useRef(null);
  const urlRef = useRef(null);

  async function handleSubmit() {
    if (
      titleRef.current.value &&
      authorRef.current.value &&
      urlRef.current.value
    ) {
      const response = await CreateNewBlog({
        title: titleRef.current.value,
        author: authorRef.current.value,
        url: urlRef.current.value,
      });
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
    } else {
      showMessage({ text: "All Fields are required", status: "error" });
    }
  }

  return (
    <div>
      <h3>Create New Blog</h3>
      <div style={formStyle}>
        <span>
          <strong>Title: </strong>
        </span>
        <input type="text" ref={titleRef} name="title"></input>
      </div>
      <div style={formStyle}>
        <span>
          <strong>Authur: </strong>
        </span>
        <input type="text" ref={authorRef} name="authur"></input>
      </div>
      <div style={formStyle}>
        <span>
          <strong>Url: </strong>
        </span>
        <input type="text" ref={urlRef} name="url"></input>
      </div>
      <div style={formStyle}>
        <button onClick={handleSubmit}>Create</button>
        <button onClick={() => setFormVisibility(false)}>Cancel</button>
      </div>
    </div>
  );
}
