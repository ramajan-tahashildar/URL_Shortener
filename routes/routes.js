import express from "express";
import {
  generateNewShortURL,
  getRedirectUrl,
  getAnalytics,
  getAllUrl,
  getUrlDetails,
} from "../controllers/url.js";

const router = express.Router();

//get analytics
router.get("/analytics/:shortID", getAnalytics);

//generate url shortener
router.post("/", generateNewShortURL);

//get all the urls
router.get("/getAllUrl", getAllUrl);

//get redirect url
router.get("/details/:shortID", getUrlDetails);

router.get("/:shortID", getRedirectUrl);

// Show all URLs on / (for /api/url/)
router.get("/", getAllUrl);

export default router;
