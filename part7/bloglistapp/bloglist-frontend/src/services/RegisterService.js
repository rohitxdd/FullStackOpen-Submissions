import axios from "axios";
const baseUrl = "http://localhost:3000/api/users";

export const register = async (credentials) => {
    return axios.post(baseUrl, credentials)
}