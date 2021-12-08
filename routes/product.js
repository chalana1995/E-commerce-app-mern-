const express = require("express");
const router = express.Router();

const {
  create,
  productById,
  read,
  remove,
  update,
  list,
  listRelated,
  listCategories,
  listBySearch,
} = require("../controllers/product");
const { userById } = require("../controllers/user");
const { requireSignin, isAuth, isAdmin } = require("../controllers/auth");

router.get("/product/:productId", read);
router.post("/product/create/:userId", requireSignin, isAdmin, create);
router.delete("/product/:productId/:userId", requireSignin, isAdmin, remove);
router.put("/product/:productId/:userId", requireSignin, isAdmin, update);
router.get("/products", list);
router.get("/products/categories", listCategories);
router.get("/products/related/:productId", listRelated);
router.post("/products/by/search", listBySearch);

router.param("userId", userById);
router.param("productId", productById);

module.exports = router;
