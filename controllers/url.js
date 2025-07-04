import { nanoid } from "nanoid";
import url from "../models/url.js";

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
    const result = await url.create({
      shortId: shortID,
      redirectUrl: body.redirectUrl,
      visitHistory: [],
    });

    return res.status(201).json({
      message: "ShortURL created successfully",
      url: shortID,
      status: "success",
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
  try {
    const shortID = req.params.shortID;
    // console.log(shortID);
    const result = await url.findOne({ shortId: shortID });
    // console.log(result);
    return res.status(200).json({
      totalVisitCounter: result.visitHistory.length,
      visitHistory: result.visitHistory,
      status: "success",
    });
    // return res.status(200).send(`
    //   <html>
    //   <head>
    //     <title>URL Analytics</title>
    //   </head>
    //   <body>
    //     <h1>Analytics for Short URL: ${shortID}</h1>
    //     <p><strong>Total Visitors:</strong> ${result.visitHistory.length}</p>
    //     <h2>Visit History:</h2>
    //     <ul>
    //     ${result.visitHistory
    //       .map(
    //         (visit, idx) =>
    //           `<li>#${idx + 1} - Time: ${new Date(
    //             visit.timestamp
    //           ).toLocaleString()}</li>`
    //       )
    //       .join("")}
    //     </ul>
    //   </body>
    //   </html>
    // `);
  } catch (err) {
    return res.status(500).json({
      message: "Internal server error",
      status: "failed",
    });
  }
}

export { generateNewShortURL, getRedirectUrl, getAnalytics };
