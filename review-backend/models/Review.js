const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  name: { type: String, required: true },
  profession: { type: String, required: true }, // new field
  message: { type: String, required: true },
  image: { type: String, required: true }, // image link
  stars: { type: Number, required: true }   // rating (1-5)
}, { timestamps: true });

module.exports = mongoose.model("Review", reviewSchema);
