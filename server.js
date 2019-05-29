const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");

const users = require("./routes/api/users");
const stock = require("./routes/api/stock");

const app = express();

// Bodyparser Middleware
app.use(bodyParser.json());

// DB Config
const db = require("./config/webconfig").mongoURI;

// Connect to Mongo
mongoose
  .connect(db) // return a promise
  .then(() => console.log("MongoDB is already Connected brow!..."))
  .catch(err => console.log("Sorry brow! MongoDB has an Error!", err));

const port = process.env.PORT || 5000;

// Use Routes
app.use("/api/users", users);
app.use("/api/stock", stock);

// Serve static assets if in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

//callback
app.listen(port, () => console.log(`Server started on port ${port}`));
