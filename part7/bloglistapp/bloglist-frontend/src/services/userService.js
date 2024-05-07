import axios from "axios";
const baseUrl = "http://localhost:3000/api/users";

export const getAllUsers = () => {
    const token = localStorage.getItem("token");
    const headers = { Authorization: `Bearer ${token}` };
    const request = axios.get(baseUrl, { headers });
    return request.then((response) => response.data);
};