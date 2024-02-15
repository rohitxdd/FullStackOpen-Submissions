import { useNavigate } from "react-router-dom";

export default function UserSection() {
  const username = localStorage.getItem("username");
  const navigate = useNavigate();

  function logoutUser() {
    localStorage.clear();
    navigate("/");
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
