const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const UserData = new Schema({
  username: {
    type: String,
    required: [true, "Sorry brow, you need username"],
    unique: true
  },
  password: {
    type: String,
    required: [true, "Sorry brow, you need a password"]
  },
  email: {
    type: String,
    lowercase: true,
    required: [true, "Sorry brow, you need an email"]
  },
  avatar: { 
    type: String, 
    required: [false]     
  },
  date: { type: Date, default: Date.now }
});

module.exports = User = mongoose.model("user", UserData);
//will create a model called item following the UserData
