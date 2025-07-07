import express from "express";
import {
  generateNewShortURL,
  getRedirectUrl,
  getAnalytics,
  getAllUrl,
} from "../controllers/url.js";

const router = express.Router();

//generate url shortener
router.post("/", generateNewShortURL);

//get analytics
router.get("/analytics/:shortID", getAnalytics);

//get all the urls
router.get("/getAllUrl", getAllUrl);

//get redirect url
router.get("/:shortID", getRedirectUrl);

export default router;
