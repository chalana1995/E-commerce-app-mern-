const User = require("../models/user");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const expressJwt = require("express-jwt");
const { errorHandler } = require("../helpers/dbErrorHandler");

exports.signup = (req, res) => {
  console.log("req.body", req.body);
  const user = new User(req.body);
  user.save((error, user) => {
    console.log("====user===", user);
    if (error) {
      return res.status(400).json({
        error: errorHandler(error),
      });
    }
    user.salt = undefined;
    user.hashed_password = undefined;
    res.json({
      user,
    });
  });
};

exports.signin = (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email }, (err, user) => {
    if (err || !user) {
      return res.status(400).json({
        err: "User with that emaildoes not exit. Please Sign up",
      });
    }

    if (!user.authenticate(password)) {
      return res.status(401).json({
        error: "Email and Password dont match",
      });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    res.cookie("t", token, { expire: new Date() + 9999 });
    const { _id, name, email, role } = user;
    return res.json({ token, user: { _id, email, name, role } });
  });
};

exports.signout = (req, res) => {
  res.clearCookie("t");
  res.json({ message: "Signout Success" });
};

exports.requireSignin = expressJwt({
  secret: process.env.JWT_SECRET,
  userProperty: "auth",
  algorithms: ["RS256"],
});

exports.isAuth = (req, res, next) => {
  let user = req.profile && req.auth && req.profile._id == req.auth._id;
  if (!user) {
    res.status(403).json({
      error: "Access Denined",
    });
  }
  next();
};

exports.isAdmin = (req, res, next) => {
  if (req.profile.admin === 0) {
    return res.status(403).json({
      error: "Admin Resource Access Denied",
    });
  }
};
