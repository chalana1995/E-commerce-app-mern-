const express = require("express");
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const expressValidator = require("express-validator");
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

app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(expressValidator());

app.use("/api", authRoute);

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
