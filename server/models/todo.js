const mongoose = require("mongoose");

const todoSchema = mongoose.Schema({
  text: String,
  completed: { type: Boolean, default: false }
});

module.exports = mongoose.model("todo", todoSchema);
