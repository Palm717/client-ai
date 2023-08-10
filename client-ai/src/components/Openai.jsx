import { useState, useEffect } from "react";
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
  const [supportedLanguages, setSupportedLanguages] = useState([]);
  const [content, setContent] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState([]);

  useEffect(() => {
    const fetchLanguages = async () => {
      try {
        const response = await axios.get("http://localhost:5000/language");
        setSupportedLanguages(response.data);
        console.log(response.data);
      } catch (err) {
        console.error("Error fetching languages:", err.message);
      }
    };

    fetchLanguages();
  }, []);

  const handleSubmit = async () => {
    try {
      const response = await axios.post("http://localhost:5000/translate", {
        content,
        language: selectedLanguage,
      });
      setTranslatedText(response.data.translatedText);
    } catch (err) {
      console.error("Error during translation: ", err.message);
    }
  };

  const handleLanguageChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions).map(
      (opt) => opt.value
    );
    setSelectedLanguage(selectedOptions);
  };

  const formattedContent = formatTranslatedText(translatedText);
  return (
    <>
      <h3>Pick a language for translation</h3>
      <select
        multiple={true}
        value={selectedLanguage}
        onChange={handleLanguageChange}
        className="language-dropdown"
      >
        {supportedLanguages.map((lang) => (
          <option key={lang.name} value={lang.name}>
            {lang.name}
          </option>
        ))}
      </select>
      <br />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows="4"
        cols="50"
        placeholder="Enter text to translate"
      />
      <br />

      <button onClick={handleSubmit}>Translate</button>
      <h3>Translation</h3>

      <ul>{formattedContent}</ul>
    </>
  );
}
