import { useState } from "react";
import loginService from "../services/loginService";
import { useNavigate } from "react-router-dom";
import { useNotification } from "../context/NotificationContext";
import { useUser } from "../context/UserContext";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setNotification } = useNotification()
  const navigate = useNavigate();
  const { setUser } = useUser()


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
        console.log(result)
        setUser(result.username)
        localStorage.setItem("token", result.token);
        setNotification({ text: "Login Successful", status: "success" });
        navigate("/home");
      } catch (e) {
        console.error(e.response.data.error);
        setNotification({ text: e.response.data.error, status: "error" });
      }
    }
  }

  return (
    <>
      <div className="bg-zinc-100">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">Log In to Application</h1>
              <div className="space-y-4 md:space-y-6">
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username:</label>
                  <input
                    type="text"
                    name="username"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    value={username}
                    onChange={handleChange}
                  ></input>
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password:</label>
                  <input
                    type="password"
                    name="password"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    value={password}
                    onChange={handleChange}
                  />
                </div>
                <div className="flex gap-3">
                  <button onClick={handleSubmit} className="text-white bg-violet-700 hover:bg-violet-800 px-5 py-1 font-semibold rounded-md">Login</button>
                  <button onClick={() => navigate("/register")} className="text-white bg-violet-700 hover:bg-violet-800 px-5 py-1 font-semibold rounded-md">Register</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
