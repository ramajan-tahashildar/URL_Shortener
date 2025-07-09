import { nanoid } from "nanoid";
import url from "../models/url.js";
import QRCode from "qrcode";

async function generateNewShortURL(req, res) {
  try {
    const body = req.body;

    const shortID = nanoid(8);

    if (!body.redirectUrl) {
      return res.status(400).json({
        message: "Url is required",
        status: "failed",
      });
    }

    // Build your shortener URL (adjust host as needed)
    const host = req.protocol + "://" + req.get("host");
    const shortUrl = `http://10.10.13.94:3000/api/url/${shortID}`;

    // Generate QR code for the shortener URL
    const qrCodeData = await QRCode.toDataURL(shortUrl);

    const result = await url.create({
      shortId: shortID,
      redirectUrl: body.redirectUrl,
      qrCode: qrCodeData,
      visitHistory: [],
      createdBy: req.user._id,
    });

    return res.status(201).json({
      message: "ShortURL created successfully",
      qrCode: qrCodeData,
      url: shortUrl,
      status: "success",
    });
  } catch (err) {
    return res.status(500).json({
      message: `Internal server error${err}`,
      status: "failed",
    });
  }
}

async function getRedirectUrl(req, res) {
  try {
    const shortID = req.params.shortID;
    const count = 0;

    if (!shortID) {
      return res.status(400).json({
        message: "Url is required",
        status: "failed",
      });
    }
    const result = await url.findOneAndUpdate(
      { shortId: shortID },
      {
        $push: {
          visitHistory: {
            timestamp: new Date(),
            count: count + 1,
          },
        },
      }
    );
    if (!result) {
      return res.status(404).json({
        message: "Url not found",
        status: "failed",
      });
    }

    return res.status(200).redirect(result.redirectUrl);
  } catch (err) {
    return res.status(500).json({
      message: "Internal server error",
      status: "failed",
    });
  }
}

async function getAnalytics(req, res) {
  try {
    const shortID = req.params.shortID;

    if (!shortID) {
      return res.status(400).json({
        message: "Url is required",
        status: "failed",
      });
    }
    const result = await url.findOne({ shortId: shortID });
    if (!result) {
      return res.status(404).json({
        message: "Url not found",
        status: "failed",
      });
    }

    return res.status(200).json({
      message: "Analytics found successfully",
      data: result,
      status: "success",
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal server error",
      status: "failed",
    });
  }
}

async function getAllUrl(req, res) {
  try {
    if (!req.user) {
      return res.status(401).json({
        message: "Unauthorized",
        status: "failed",
      });
    }
    const result = await url.find({ createdBy: req.user._id }); // get all URL entries from DB
    return res.status(200).json({
      message: "All url found successfully",
      data: result,
      status: "success",
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal server error",
      status: "failed",
    });
  }
}

async function getUrlDetails(req, res) {
  try {
    const { shortID } = req.params;
    const result = await url.findOne({ shortId: shortID });

    if (!result) {
      return res.status(404).send("URL not found");
    }

    return res.status(200).json({
      message: "URL found successfully",
      data: result,
    });
  } catch (err) {
    return res.status(500).send("Internal server error");
  }
}

export {
  generateNewShortURL,
  getRedirectUrl,
  getAnalytics,
  getAllUrl,
  getUrlDetails,
};
