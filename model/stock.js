const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const Stock = new Schema({
  productName: { type: String, unique: true, required: true },
  description: { type: String, required: true },
  keywords: { type: String },
  image: { type: String },
  price: { type: Number },
  date: { type: Date, default: Date.now }
});

module.exports = Good = mongoose.model("good", Stock);
//will create a model called item following the Stock
