const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const postSchema = new Schema({
  headline: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: { type: String, required: true },
  image: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  creator: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "User",
  },
});

module.exports = mongoose.model("Post", postSchema);
