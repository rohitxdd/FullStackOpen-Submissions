import { useEffect, useState } from "react";
import UserSection from "./UserSection";
import BlogList from "./BlogList";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import CreateBlog from "./CreateBlog";
import {
  getAllBlog,
  IncrementLikeOfBlog,
  RemoveBlogByID,
} from "../services/blogs";
import { setNotification } from "../reducers/notificationReducer";
import { useDispatch, useSelector } from "react-redux";
import { removeBlog, setBlogs } from "../reducers/blogReducer";

export default function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const blogs = useSelector(state => {
    return state.blogs
  });
  const [formVisible, setFormVisibility] = useState(false);

  async function IncrementLike(id) {
    try {
      const response = await IncrementLikeOfBlog(id);
      if (response) {
        const newBlogArr = blogs.map((e) => {
          if (e.id === response.id) {
            return response;
          } else {
            return e;
          }
        });
        newBlogArr.sort((a, b) => b.likes - a.likes);
        dispatch(setBlogs(newBlogArr))
      }
    } catch (e) {
      console.log(e.message);
    }
  }

  async function getBlogs() {
    const res = await getAllBlog();
    if (res && res.length > 0) {
      res.sort((a, b) => b.likes - a.likes);
      dispatch(setBlogs(res))
    }
  }

  const RemoveBlog = async (id) => {
    const res = await RemoveBlogByID(id);
    if (res.status == 204) {
      dispatch(removeBlog({ id }))
      dispatch(setNotification({ text: "Blog deleted", status: "success" }));
    }
  };

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
    getBlogs();
  }, []);

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
        blogs={blogs}
        IncrementLike={IncrementLike}
        RemoveBlog={RemoveBlog}
      />
    </div>
  );
}
