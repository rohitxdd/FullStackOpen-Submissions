import { useEffect } from "react";
import Login from "./components/Login";
import { Routes, Route } from "react-router-dom";
import { MessageProvider } from "./services/MessageContext";
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
    <MessageProvider>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </MessageProvider>
  );
};

export default App;
