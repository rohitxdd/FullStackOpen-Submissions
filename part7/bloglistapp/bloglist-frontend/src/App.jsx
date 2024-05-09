import Login from "./components/Login";
import { Routes, Route } from "react-router-dom";
import { Notification } from "./services/Notification";
import Home from "./components/Home";
import { NotificationProvider } from "./context/NotificationContext";
import { UserProvider } from "./context/UserContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Users from "./pages/Users";
import User from "./components/User";
import Register from "./pages/Register";

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
