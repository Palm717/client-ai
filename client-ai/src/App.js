import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Translator from "./pages/Translator";
import Openai from "./components/Openai";
import "./App.css";

function App() {
  return (
    <Router>
      <main className="main-container">
        <Routes>
          <Route path="/" element={<Translator />} />
          <Route path="/translate" element={<Openai />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
