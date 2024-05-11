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
    <div className="bg-violet-300">
      <div className="flex justify-between items-center md:px-9  sm:px-4 px-2 py-2">
        <div>
          <p className="md:text-3xl text-xl font-semibold font-mono">Blog App</p>
        </div>
        <div className="flex md:space-x-3 space-x-2 font-mono">
          <h3 className="cursor-pointer underline underline-offset-4" onClick={() => navigate("/home")}>Blogs</h3>
          <h3 className="cursor-pointer underline underline-offset-4" onClick={() => navigate("/users")}>Users</h3>
          <button onClick={logoutUser} className="cursor-pointer underline underline-offset-4">Logout</button>
          <h3> <span className="font-semibold">{username}</span> logged in</h3>
        </div>
      </div>
    </div>
  );
}
