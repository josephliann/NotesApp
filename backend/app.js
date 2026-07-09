import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import usermodel from "./usermodel.js";
import notemodel from "./notemodel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import auth from "./auth.js";

const app = express();

app.use(express.json());
app.use(cors());

console.log("MONGO_URL EXISTS:", !!process.env.MONGO_URL);

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("DB connected"))
  .catch((err) => console.log(err));

app.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await usermodel.findOne({ email });

    if (existingUser) {
      return res.json({
        success: false,
        message: "Email already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await usermodel.create({
      name,
      email,
      password: hashedPassword,
    });

    res.json({
      success: true,
      message: "User created successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

app.post("/login", async (req, res) => {
  try {
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

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.json({
        success: false,
        message: "Incorrect password",
      });
    }

    const token = jwt.sign(
      {
        userId: user._id,
      },
      "mysecretkey",
      {
        expiresIn: "1d",
      }
    );

    res.json({
      success: true,
      message: "Login successful",
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

app.post("/add-note", auth, async (req, res) => {
  try {
    const { title, content } = req.body;

    const note = await notemodel.create({
      userId: req.userId,
      title,
      content,
    });

    res.json({
      success: true,
      note,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
    });
  }
});

app.get("/notes", auth, async (req, res) => {
  try {
    const notes = await notemodel.find({
      userId: req.userId,
    });

    res.json({
      success: true,
      notes,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
    });
  }
});

app.delete("/delete-note/:id", auth, async (req, res) => {
  try {
    await notemodel.findOneAndDelete({
      _id: req.params.id,
      userId: req.userId,
    });

    res.json({
      success: true,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
    });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
