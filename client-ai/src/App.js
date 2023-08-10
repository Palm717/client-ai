import "./App.css";
import Openai from "./components/Openai";

function App() {
  return (
    <>
      <h2 style={{ textAlign: "center" }}>Translator</h2>
      <div className="App">
        <Openai />
      </div>
    </>
  );
}

export default App;
