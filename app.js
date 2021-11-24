const express = require("express");
const mongoose = require("mongoose");
const app = express();
require("dotenv").config();

//db
mongoose.connect(process.env.DATABASE).then(() => {
  console.log("databse connected");
});

// route
app.get("/", (req, res) => {
  res.send("hello from node");
});

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
