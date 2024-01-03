import { useState } from "react";
import loginService from "../services/loginService";
import { useMessage } from "../services/MessageContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate()

  const { showMessage } = useMessage();

  function handleChange(e) {
    const { name, value } = e.target;
    if (name === "username") {
      setUsername(value);
    } else {
      setPassword(value);
    }
  }

  async function handleSubmit() {
    if (username.trim() && password.trim()) {
      try {
        const result = await loginService.login({ username, password });
        localStorage.setItem("username", result.username);
        localStorage.setItem("token", result.token);
        showMessage({ text: "Login Successful", status: "success" });
        navigate("/home");
      } catch (e) {
        console.error(e.response.data.error);
        showMessage({ text: e.response.data.error, status: "error" });
      }
    }
  }

  return (
    <>
      <h1>Log In to Application</h1>
      <div>
        <span style={{ display: "block" }}>
          <strong>Username: </strong>
        </span>
        <input
          type="text"
          name="username"
          value={username}
          onChange={handleChange}
        ></input>
        <div>
          <span style={{ display: "block", marginTop: "1rem" }}>
            <strong>Password: </strong>
          </span>
          <input
            type="password"
            name="password"
            value={password}
            onChange={handleChange}
          />
        </div>
        <div style={{ marginTop: "1rem" }}>
          <button onClick={handleSubmit}>Login</button>
        </div>
      </div>
    </>
  );
}
