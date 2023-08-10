import mongoose from "mongoose";

const LangSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
});

const Language = mongoose.model("Language", LangSchema);
export default Language;
