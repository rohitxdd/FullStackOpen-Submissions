import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { reset } from "../reducers/userReducer";

export default function UserSection() {
  const username = localStorage.getItem("username");
  const navigate = useNavigate();
  const dispatch = useDispatch()

  function logoutUser() {
    localStorage.clear();
    dispatch(reset())
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
