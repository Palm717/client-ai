import { config } from "dotenv";
import express from "express";
import cors from "cors";
import mongoDbConnect from "./config/db.js";

import { langRoute, translationRoute } from "./routes/index.js";

config();
mongoDbConnect();

const app = express();
app.use(express.json());
app.use(cors());

app.use("/", translationRoute);
app.use("/", langRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
