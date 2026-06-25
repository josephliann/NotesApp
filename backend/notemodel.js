import mongoose from "mongoose";

const noteSchema = mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  title: String,
  content: String,
});

export default mongoose.model("note", noteSchema);