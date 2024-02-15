import axios from "axios";
const baseUrl = "http://localhost:3000/api/blogs";

export const getAllBlog = () => {
  const token = localStorage.getItem("token");
  const headers = { Authorization: `Bearer ${token}` };
  const request = axios.get(baseUrl, { headers });
  return request.then((response) => response.data);
};

export const CreateNewBlog = async (BlogBody) => {
  const token = localStorage.getItem("token");
  const headers = { Authorization: `Bearer ${token}` };
  const response = await axios.post(baseUrl, BlogBody, { headers });
  console.log(response.data);
  return response.data;
};

export const IncrementLikeOfBlog = async (blogid) => {
  const token = localStorage.getItem("token");
  const headers = { Authorization: `Bearer ${token}` };
  let url = `${baseUrl}/like/${blogid}`;
  const response = await axios.put(url, {}, { headers });
  return response.data;
};

export const RemoveBlogByID = async (blogid) => {
  const token = localStorage.getItem("token");
  const headers = { Authorization: `Bearer ${token}` };
  let url = `${baseUrl}/${blogid}`;
  const response = await axios.delete(url, { headers });
  return response;
};
