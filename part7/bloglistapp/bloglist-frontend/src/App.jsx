import { useEffect } from "react";
import Login from "./components/Login";
import { Routes, Route } from "react-router-dom";
import { Notification } from "./services/Notification";
import Home from "./components/Home";
import { useNavigate } from "react-router-dom";

const App = () => {
  const navigate = useNavigate();
  const hasToken = !!localStorage.getItem("token");

  useEffect(() => {
    if (hasToken) {
      navigate("home");
    }
  }, [hasToken]);

  return (
    <Notification>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </Notification>
  );
};

export default App;
