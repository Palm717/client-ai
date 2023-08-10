import express from "express";
import Language from "../models/Language.js";

const router = express.Router();

router.get("/language", async (req, res) => {
  try {
    const languages = await Language.find();
    res.json(languages);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
