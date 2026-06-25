import express from "express";
import mongoose from "mongoose";
import cors from "cors"; 
import usermodel from "./usermodel.js"; 
import notemodel from "./notemodel.js";

const app = express();

app.use(express.json()); 
app.use(cors()); 

console.log("MONGO_URL EXISTS:", !!process.env.MONGO_URL);
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("DB connected"))
  .catch((err) => console.log("MongoDB error:", err));

app.post("/register", async (req, res) => {
  try {
    console.log("REGISTER BODY:", req.body);
    const user = await usermodel.create(req.body);
    res.json({
      success: true,
      user,
    });
  } catch (err) {
    console.error("REGISTER ERROR:", err);
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});
app.post("/add-note", async (req, res) => {
  try {
    const { userId, title, content } = req.body;

    const note = await notemodel.create({
      userId,
      title,
      content,
    });

    res.json({ success: true, note });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false });
  }
});


app.get("/notes/:userId", async (req, res) => {
  try {
    const notes = await notemodel.find({
      userId: req.params.userId,
    });

    res.json({ success: true, notes });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false });
  }
});

app.post("/login", async (req, res) => {
  try {
    console.log("LOGIN HIT:", req.body);

    const { email, password } = req.body;

    if (!email || !password) {
      return res.json({
        success: false,
        message: "All fields required",
      });
    }

    const user = await usermodel.findOne({ email });

    if (!user) {
      return res.json({
        success: false,
        message: "User not found",
      });
    }

    if (user.password !== password) {
      return res.json({
        success: false,
        message: "Incorrect password",
      });
    }

    return res.json({
      success: true,
      message: "Login successful",
      user,
    });
  } catch (err) {
    console.log("LOGIN ERROR:", err.message);

    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});


app.delete("/delete-note/:id", async (req, res) => {
  try {
    await notemodel.findByIdAndDelete(req.params.id);

    res.json({ success: true });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false });
  }
});


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {

  console.log("Server running on port", PORT);

});
