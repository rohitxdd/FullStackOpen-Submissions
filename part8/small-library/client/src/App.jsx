import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import { Route, useNavigate, Routes } from "react-router-dom";
import UpdateBirth from "./components/UpdateBirth";

const App = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div>
        <button onClick={() => navigate("/authors")}>authors</button>
        <button onClick={() => navigate("/")}>books</button>
        <button onClick={() => navigate("/add")}>add book</button>
      </div>
      <Routes>
        <Route path="/" element={<Books />} />
        <Route path="/authors" element={<Authors />} />
        <Route path="/add" element={<NewBook />} />
        <Route path="/update-birth" element={<UpdateBirth />} />
      </Routes>
    </div>
  );
};

export default App;
