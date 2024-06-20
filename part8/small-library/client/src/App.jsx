import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import { Route, useNavigate, Routes } from "react-router-dom";
import UpdateBirth from "./components/UpdateBirth";
import Login from "./components/Login";
import { useState } from "react"
import { UserContext } from "./hooks/UserContext"
import { useEffect } from "react";
import Recommend from "./components/Recommend";
import { jwtDecode } from "jwt-decode";

const App = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);


  function setUserToken(token) {
    localStorage.setItem("user-token", JSON.stringify(token))
    if (!token) {
      setUser(null)
    } else {
      const decoded = jwtDecode(token);
      setUser(decoded)
    }
  }

  useEffect(() => {
    if (localStorage.getItem("user-token")) {
      setUser(JSON.parse(localStorage.getItem("user-token")))
    }
  }, [])

  return (
    <UserContext.Provider value={{ user, setUserToken }}>
      <div>
        <div>
          <button onClick={() => navigate("/authors")}>authors</button>
          <button onClick={() => navigate("/")}>books</button>
          {user &&
            <>
              <button onClick={() => navigate("/add")}>add book</button>
              <button onClick={() => navigate("/recommend")}>Recommendation</button>
              <button onClick={() => setUserToken(null)}>Logout</button>
            </>
          }
          {!user && <button onClick={() => navigate('/login')}>Login</button>}
        </div>
        <Routes>
          <Route path="/" element={<Books />} />
          <Route path="/authors" element={<Authors />} />
          <Route path="/add" element={<NewBook />} />
          <Route path="/update-birth" element={<UpdateBirth />} />
          <Route path="/login" element={<Login />} />
          <Route path="/recommend" element={<Recommend />} />
        </Routes>
      </div>
    </UserContext.Provider>

  );
};

export default App;
