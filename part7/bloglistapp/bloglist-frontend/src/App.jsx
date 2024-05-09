import Login from "./components/Login";
import { Routes, Route } from "react-router-dom";
import { Notification } from "./services/Notification";
import Home from "./pages/Home";
import { NotificationProvider } from "./context/NotificationContext";
import { UserProvider } from "./context/UserContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Users from "./pages/Users";
import User from "./components/User";
import Register from "./pages/Register";
import Blog from "./components/Blog";

const App = () => {
  return (
    <UserProvider>
      <NotificationProvider>
        <Notification>
          <Routes>
            <Route element={<ProtectedRoute />}>
              <Route path="/home" element={<Home />} />
              <Route path="/users" element={<Users />} />
              <Route path="/users/:id" element={<User />} />
              <Route path="/blog/:id" element={<Blog />} />
            </Route>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </Notification>
      </NotificationProvider>
    </UserProvider>
  );
};

export default App;
