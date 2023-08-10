import { config } from "dotenv";
import { Configuration, OpenAIApi } from "openai";
import express from "express";
import cors from "cors";

config();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_KEY,
});

const openai = new OpenAIApi(configuration);

const app = express();
app.use(express.json());
app.use(cors());

app.post("/translate", async (req, res) => {
  const content = req.body.content;

  try {
    const translatedText = await translateFunction(content);
    res.json({ translatedText });
  } catch (err) {
    res.status(500).json({ error: "Error Translating text: " + err.message });
  }

  async function translateFunction(content) {
    const initPrompt = `translate this ${content} into a list of 5 different languages with the correct translation provided. Remember to answer with a list. `;

    const completeTranslation = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: initPrompt,
      max_tokens: 4000,
    });

    return completeTranslation.data.choices[0].text.trim();
  }
});

const PORT = process.env.port || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
