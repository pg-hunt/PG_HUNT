import express from "express";
import { login, registerUser, logout } from "../controllers/auth.js";

const router = express.Router();

router.post("/login", login);
router.post("/register", registerUser);
router.get("/logout", logout);

export default router;