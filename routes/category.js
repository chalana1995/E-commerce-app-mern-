const express = require("express");
const router = express.Router();

const { create, categoryId, read } = require("../controllers/category");
const { userById } = require("../controllers/user");
const { requireSignin, isAuth, isAdmin } = require("../controllers/auth");

router.get("/category/:categoryId", read);
router.post("/category/create/:userId", requireSignin, isAdmin, create);

router.param("userId", userById);
router.param("categoryId", categoryId);

module.exports = router;
