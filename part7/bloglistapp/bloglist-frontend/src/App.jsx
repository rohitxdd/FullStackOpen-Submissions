import Login from "./components/Login";
import { Routes, Route } from "react-router-dom";
import { Notification } from "./services/Notification";
import Home from "./components/Home";
import { NotificationProvider } from "./context/NotificationContext";
import { UserProvider } from "./context/UserContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Users from "./pages/Users";

const App = () => {
  return (
    <UserProvider>
      <NotificationProvider>
        <Notification>
          <Routes>
            <Route element={<ProtectedRoute />}>
              <Route path="/user" element={<Users />} />
              <Route path="/home" element={<Home />} />
            </Route>
            <Route path="/" element={<Login />} />
          </Routes>
        </Notification>
      </NotificationProvider>
    </UserProvider>
  );
};

export default App;
