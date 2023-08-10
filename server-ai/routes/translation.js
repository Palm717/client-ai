import express from "express";
import { config } from "dotenv";
import { Configuration, OpenAIApi } from "openai";

config();
const router = express.Router();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_KEY,
});

const openai = new OpenAIApi(configuration);

router.post("/translate", async (req, res) => {
  const content = req.body.content;
  const language = req.body.language;

  try {
    const translatedText = await translateFunction(content, language);
    res.json({ translatedText });
  } catch (err) {
    res.status(500).json({ error: "Error Translating text: " + err.message });
  }

  async function translateFunction(content, language) {
    const languageList = language.join(", ");
    const initPrompt = `Translate the sentence "${content}" to ${languageList}. Please provide the translations in a list format.`;

    const completeTranslation = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: initPrompt,
      max_tokens: 4000,
    });

    return completeTranslation.data.choices[0].text.trim();
  }
});

export default router;
