const express = require("express");
const router = express.Router();

const {
  create,
  categoryId,
  read,
  update,
  remove,
  list,
} = require("../controllers/category");
const { userById } = require("../controllers/user");
const { requireSignin, isAuth, isAdmin } = require("../controllers/auth");

router.get("/category/:categoryId", read);
router.post("/category/create/:userId", requireSignin, isAdmin, create);
router.put("/category/:categoryId/:userId", requireSignin, isAdmin, update);
router.delete("/category/:categoryId/:userId", requireSignin, isAdmin, remove);
router.get("/categoryies", list);

router.param("userId", userById);
router.param("categoryId", categoryId);

module.exports = router;
