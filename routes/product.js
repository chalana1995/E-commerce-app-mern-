const express = require("express");
const router = express.Router();

const { create } = require("../controllers/product");
const { userById } = require("../controllers/user");
const { requireSignin, isAuth, isAdmin } = require("../controllers/auth");

router.post("/product/create/:userId", requireSignin, isAdmin, create);

router.param("userId", userById);

module.exports = router;
