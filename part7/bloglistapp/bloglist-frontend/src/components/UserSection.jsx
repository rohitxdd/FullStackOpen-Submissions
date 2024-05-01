import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export default function UserSection() {
  const username = localStorage.getItem("username");
  const navigate = useNavigate();
  const queryClient = useQueryClient()

  function logoutUser() {
    localStorage.clear();
    navigate("/");
    queryClient.removeQueries()
    queryClient.invalidateQueries();
  }
  return (
    <div>
      <span>{username} logged in</span>
      <span>
        <button onClick={logoutUser}>Logout</button>
      </span>
    </div>
  );
}
