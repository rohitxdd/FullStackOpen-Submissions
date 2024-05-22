import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import { Router, Route, useNavigate } from "react-router-dom";

const App = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div>
        <button onClick={() => navigate("/authors")}>authors</button>
        <button onClick={() => navigate("/")}>books</button>
        <button onClick={() => navigate("/add")}>add book</button>
      </div>
      <Router>
        <Route path="/" element={<Books />} />
        <Route path="/authors" element={<Authors />} />
        <Route path="/add" element={<NewBook />} />
      </Router>
    </div>
  );
};

export default App;
