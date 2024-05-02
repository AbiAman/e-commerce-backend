const express = require("express");
const {
  createUser,
  loginUserCtrl,
  getallUser,
  getaUser,
  deleteaUser,
  updatedUser,
  blockUser,
  unblockUser,
  handleRefreshToken,
  logout,
  updatePassword,
  forgotPasswordToken,
  resetPassword,
  loginAdmin,
  getWhislist,
  saveAddress,
  userCart,
  getUserCart,
  createOrder,
  getMonthWiseOrderIncome,
  removeProduactFromCart,
  updatePoduactQuantitryFromCart,
  getMyOrders,
  getAllOrders,
  getSingleOrders,
  updateOrders,
  emptyCart,
  deleteOrder,
  loginSeller,
} = require("../controller/userController");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/register", createUser);
router.post("/forgot-password-token", forgotPasswordToken);
router.put("/reset-Password/:token", resetPassword);
router.put("/password", authMiddleware, updatePassword);
router.get("/getMonthWiseOrderIncome", authMiddleware, getMonthWiseOrderIncome);

router.post("/login", loginUserCtrl);
router.post("/login-seller", loginSeller);
router.post("/cart", authMiddleware, userCart);
router.post("/cart/create-order", authMiddleware, createOrder);

router.post("/admin-login", loginAdmin);
router.post("/seller-login", loginSeller);
router.get("/all-User", getallUser);
router.get("/getMyorders", authMiddleware, getMyOrders);
router.get("/getallorders", authMiddleware, isAdmin, getAllOrders);
router.get("/getaorder/:id", authMiddleware, isAdmin, getSingleOrders);
router.put("/updateOrders/:id", authMiddleware, isAdmin, updateOrders);
router.get("/refresh", handleRefreshToken);
router.get("/logout", logout);
router.get("/wishlist", authMiddleware, getWhislist);
router.get("/cart", authMiddleware, getUserCart);

router.delete("/orders/:id", authMiddleware, deleteOrder);
router.get("/:id", getaUser);
router.delete(
  "/delete-product-cart/:cartItemId",
  authMiddleware,
  removeProduactFromCart
);
router.delete(
  "/update-product-cart/:cartItemId/:newQuantity",
  authMiddleware,
  updatePoduactQuantitryFromCart
);

router.delete("/empty", authMiddleware, emptyCart);
router.delete("/:id", deleteaUser);

router.put("/edit-user", authMiddleware, updatedUser);
router.put("/save-address", authMiddleware, saveAddress);
router.put("/block-user/:id", authMiddleware, isAdmin, blockUser);
router.put("/unblock-user/:id", authMiddleware, isAdmin, unblockUser);

module.exports = router;
