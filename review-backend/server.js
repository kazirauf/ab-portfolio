const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const Review = require("./models/Review");

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection (prevent multiple connections on serverless)
let isConnected = false;
const connectDB = async () => {
  if (isConnected) return;
  await mongoose.connect(process.env.MONGO_URI);
  isConnected = true;
};

// POST - Add review
app.post("/api/reviews", async (req, res) => {
  await connectDB();
  try {
    console.log("Request body:", req.body);

    const { name, profession, message, image, stars } = req.body;

    if (!name || !profession || !message || !image || stars == null) {
      return res
        .status(400)
        .json({ error: "All fields (name, profession, message, image, stars) are required." });
    }

    const newReview = new Review({ name, profession, message, image, stars });
    await newReview.save();

    res.status(201).json(newReview);
  } catch (error) {
    console.error("Error in POST /api/reviews:", error);
    res.status(500).json({ error: error.message });
  }
});

// GET - Get all reviews
app.get("/api/reviews", async (req, res) => {
  await connectDB();
  try {
    const reviews = await Review.find().sort({ createdAt: -1 });
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Export app for Vercel (no app.listen)
module.exports = app;
