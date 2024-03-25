import express from "express";
const router = express.Router();
import {
  register,
  login,
  logged,
  logout,
} from "../controllers/userControllers.js";

router.post("/register", register);
router.post("/login", login);
router.get("/profile", logged);
router.post("/logout", logout);

export default router;
