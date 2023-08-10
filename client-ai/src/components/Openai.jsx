import { useState } from "react";
import axios from "axios";

function formatTranslatedText(text) {
  const lines = text.split("\n"); // Split by newline to handle multi-line responses
  const formattedLines = lines.map((line) => {
    const match = line.match(/^(\d+)\.\s(.+)$/);
    if (match) {
      return (
        <li style={{ listStyleType: "none" }} key={match[1]}>
          {match[2]}
        </li>
      );
    }
    return line;
  });

  return formattedLines;
}

export default function Openai() {
  const [content, setContent] = useState("");
  const [translatedText, setTranslatedText] = useState("");

  const handleSubmit = async () => {
    try {
      const response = await axios.post("http://localhost:5000/translate", {
        content,
      });
      setTranslatedText(response.data.translatedText);
    } catch (err) {
      console.error("Error during translation: ", err.message);
    }
  };

  const formattedContent = formatTranslatedText(translatedText);
  return (
    <>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows="4"
        cols="50"
        placeholder="Enter text to translate"
      />
      <br />
      <button onClick={handleSubmit}>Translate</button>
      <h2>Translated Text:</h2>
      <ul>{formattedContent}</ul>
    </>
  );
}
