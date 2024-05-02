const express = require("express");
const  { createSeller, sellerLogin, updatedSeller }  = require("../controller/sellerCtrl");
const {authMiddleware,isSeller} = require("../middlewares/authMiddleware");
const router = express.Router();


router.post("/register",createSeller);
router.post("/seller-login",sellerLogin);
router.put("/edit-seller",authMiddleware,updatedSeller);
/*
router.get("/all-User",getallUser);
router.get("/cart",authMiddleware,getUserCart);
router.get("/:id",getaUser);


*/

module.exports = router;
