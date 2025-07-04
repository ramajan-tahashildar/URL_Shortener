import express from "express";
import { generateNewShortURL } from "../controllers/url.js";
import { getRedirectUrl } from "../controllers/url.js";
import { getAnalytics } from "../controllers/url.js";

const router = express.Router();

//generate url shortener
router.post("/", generateNewShortURL);

//get redirect url
router.get("/:shortID", getRedirectUrl);

//get analytics
router.get("/analytics/:shortID", getAnalytics);
export default router;
