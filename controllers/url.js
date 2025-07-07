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
    // console.log(shortUrl);

    // Generate QR code for the shortener URL
    const qrCodeData = await QRCode.toDataURL(shortUrl);

    const result = await url.create({
      shortId: shortID,
      redirectUrl: body.redirectUrl,
      qrCode: qrCodeData,
      visitHistory: [],
    });

    // return res.status(201).json({
    //   message: "ShortURL created successfully",
    //   url: shortID,
    //   status: "success",
    // });

    return res.render("success", {
      shortId: shortID,
      shortUrl,
      qrCode: qrCodeData,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal server error",
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
    // console.log(result);
    // const findUrl = await url.findOne({ shortId: shortID });
    return res.status(200).redirect(result.redirectUrl);
  } catch (err) {
    return res.status(500).json({
      message: "Internal server error",
      status: "failed",
    });
  }
}

async function getAnalytics(req, res) {
  // console.log("[getAnalytics] Route hit");
  try {
    const shortID = req.params.shortID;
    // console.log("[getAnalytics] shortID:", shortID);
    if (!shortID) {
      // console.log("[getAnalytics] No shortID provided");
      return res.status(400).json({
        message: "Url is required",
        status: "failed",
      });
    }
    const result = await url.findOne({ shortId: shortID });
    if (!result) {
      // console.log("[getAnalytics] No result found for shortID:", shortID);
      return res.status(404).json({
        message: "Url not found",
        status: "failed",
      });
    }
    // console.log("[getAnalytics] Result found for shortID:", shortID);
    res.render("analytics", {
      shortId: shortID,
      totalVisitCounter: result.visitHistory.length,
      visitHistory: result.visitHistory,
    });
  } catch (err) {
    // console.error("[getAnalytics] Error:", err);
    return res.status(500).json({
      message: "Internal server error",
      status: "failed",
    });
  }
}

async function getAllUrl(req, res) {
  try {
    const result = await url.find(); // get all URL entries from DB

    return res.render("home", {
      urls: result,
    }); // pass urls to EJS template
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

    return res.render("details", { data: result });
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
