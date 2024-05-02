const Seller = require("../models/sellerModel");
const asyncHandler = require("express-async-handler");
const { generateToken } = require("../config/jwtToken");
const { generateRefreshToken } = require("../config/refreshtoken");
const jwt = require("jsonwebtoken");

const createSeller = asyncHandler(async (req, res) => {
    const email = req.body.email;
    const findSeller = await Seller.findOne({ email: email });
  
    if (!findSeller) {
        const newSeller = await Seller.create(req.body);
        res.json(newSeller);
    } else {
        throw new Error("Seller Already Exists");
    }
});


const sellerLogin = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    // check if user exists or not
    const findSeller = await Seller.findOne({ email });
  
    if (findSeller.role !== "seller" && findSeller.sellerStatus !== "active") {
      throw new Error("Not authorized");
    }
    if (findSeller && (await findSeller.isPasswordMatched(password))) {
      const refreshToken = await generateRefreshToken(findSeller?._id);
      const updateuser = await Seller.findByIdAndUpdate(
        findSeller.id,
        {
          refreshToken: refreshToken,
        },
        { new: true }
      );
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        maxAge: 72 * 60 * 60 * 1000,
      });
  
      res.json({
        _id: findSeller?._id,
        firstname: findSeller?.firstname,
        lastname: findSeller?.lastname,
        email: findSeller?.email,
        mobile: findSeller?.mobile,
        token: generateToken(findSeller?._id),
      });
    } else {
      throw new Error("Invalid Credentials");
    }
  });
  const updatedSeller = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    validateMongoDbId(_id);
  
    try {
      const updateSeller = await Seller.findByIdAndUpdate(
        _id,
        {
          firstname: req?.body?.firstname,
          lastname: req?.body?.lastname,
          email: req?.body?.email,
          mobile: req?.body?.mobile,
          shopName: req?.body?.shopName,
        shopAddress: req?.body?.shopAddress,
        },
        {
          new: true,
        }
      );
      res.json(updateSeller);
    } catch (error) {
      throw new Error(error);
    }
  });
  
module.exports = { createSeller ,sellerLogin , updatedSeller};
