import { config } from "dotenv";
import express from "express";
import cors from "cors";

import translationRoute from "./routes/translation.js";

config();

const app = express();
app.use(express.json());
app.use(cors());

app.use("/", translationRoute);

const PORT = process.env.port || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
