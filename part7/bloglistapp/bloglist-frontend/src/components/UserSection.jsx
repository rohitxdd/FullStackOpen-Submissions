import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

export default function UserSection() {
  const { state: { username } } = useUser()
  const navigate = useNavigate();
  const queryClient = useQueryClient()

  function logoutUser() {
    localStorage.clear();
    navigate("/");
    queryClient.removeQueries()
    queryClient.invalidateQueries();
  }
  return (
    <div style={{ display: "flex", gap: "0.9rem", padding: "0px 10px", backgroundColor: "#80808063", alignItems: "center" }}>
      <h3 style={{ cursor: "pointer", textDecoration: "underline" }} onClick={() => navigate("/home")}>Blogs</h3>
      <h3 style={{ cursor: "pointer", textDecoration: "underline" }} onClick={() => navigate("/users")}>Users</h3>
      <h3 style={{ cursor: "pointer" }}>{username} logged in</h3>
      <div>
        <button onClick={logoutUser}>Logout</button>
      </div>
    </div>
  );
}
