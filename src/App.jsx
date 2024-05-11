import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import TodoApp from "./pages/TodoApp.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<TodoApp />} />
      </Routes>
    </Router>
  );
}

export default App;
