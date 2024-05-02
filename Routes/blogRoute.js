const express = require("express");
const router = express.Router();

const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
const { createBlog, updateBlog, getBlog, getAllBlogs, deleteBlog, liketheBlog, disliketheBlog, uploadImages } = require("../controller/blogCtrl");
const { uploadPhoto, blogImgResize } = require("../middlewares/uploadImage");

router.post("/", authMiddleware, isAdmin, createBlog);
router.put("/uplode/:id" , authMiddleware, isAdmin , uploadPhoto.array('images', 2),
blogImgResize,uploadImages);
router.put("/likes",authMiddleware, isAdmin,  liketheBlog);
router.put("/dislikes",authMiddleware, isAdmin,  disliketheBlog);
router.put("/:id", authMiddleware, isAdmin, updateBlog);

router.get("/:id",  getBlog);
router.get("/",  getAllBlogs);
router.delete("/:id",authMiddleware, isAdmin,  deleteBlog);

module.exports = router;
