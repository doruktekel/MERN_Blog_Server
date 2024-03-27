import express from "express";
const router = express.Router();
import {
  register,
  login,
  logged,
  logout,
  createPost,
  getPosts,
} from "../controllers/userControllers.js";
import multer from "multer";

const upload = multer({ dest: "uploads/" });

router.post("/register", register);
router.post("/login", login);
router.get("/profile", logged);
router.post("/logout", logout);
router.post("/post", upload.single("file"), createPost);
router.get("/post", getPosts);

export default router;
