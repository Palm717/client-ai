import React from "react";
import { Link } from "react-router-dom";

export default function Translator() {
  return (
    <div className="main-container">
      <h3>AI Assisted Translation</h3>

      <p
        style={{
          fontSize: "1rem",
          margin: "1rem auto",
        }}
      >
        Fast translations at the click of a button.
      </p>
      <ul className="lang-page-style">
        <li className="lang-list-item">Enter text in your language</li>
        <li className="lang-list-item">
          Select a langauge to translate the text into
        </li>
        <li className="lang-list-item">
          Click the translate button and watch the magic.
        </li>
      </ul>

      <hr style={{ margin: "2rem 0", width: "70%" }} />

      <Link to="/translate" style={{ textDecoration: "none" }}>
        <button>Try OpenAI Translation Now!</button>
      </Link>

      <footer style={{ marginTop: "2rem", textAlign: "center" }}>
        <p style={{ fontSize: "0.8rem" }}>A project powered by OpenAI API.</p>
      </footer>
    </div>
  );
}
