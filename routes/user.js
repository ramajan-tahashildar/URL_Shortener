import express from "express";
import { signInuser, getAllTheuser, loginUser } from "../controllers/user.js";

const router = express.Router();

router.post("/", signInuser);
router.get("/getUser", getAllTheuser);
router.post("/login", loginUser);

export default router;
