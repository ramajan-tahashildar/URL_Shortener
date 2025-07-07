import express from "express";
import router from "./routes/routes.js";
import middleware from "./middleware/index.js";
import connect from "./connection.js";
import dotenv from "dotenv";
import path from "path";

// add this line at the top
import url from "./models/url.js";
import QRCode from "qrcode";

dotenv.config();

//init express
const app = express();

//ejs setup
app.set("view engine", "ejs");
app.set("views", path.join(path.resolve(), "views"));

//Custome middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // for form data (HTML forms)

app.use(middleware("./log.txt"));

//port
const PORT = 3000;

//Database Connection
const DB_URL = process.env.MONGODATABASE_URL;
connect(DB_URL);

//Routes
app.use("/api/url", router);

//app listener
app.listen(PORT, "0.0.0.0", () => {
  return console.log(`Server is listening on http://localhost:${PORT}`);
});

// serve UI on "/"
app.get("/", async (req, res) => {
  res.render("index"); // render the new minimal landing page
  // default view
});

app.post("/api/url/", async (req, res) => {
  try {
    const body = req.body;
    const shortID = nanoid(8);

    if (!body.redirectUrl) {
      return res.status(400).send("URL required");
    }

    const host = req.protocol + "://" + req.get("host");
    const shortUrl = `${host}/api/url/${shortID}`;
    const qrCodeData = await QRCode.toDataURL(shortUrl);

    await url.create({
      shortId: shortID,
      redirectUrl: body.redirectUrl,
      qrCode: qrCodeData,
      visitHistory: [],
    });

    res.render("index", {
      shortUrl,
      qrCode: qrCodeData,
    });
  } catch (err) {
    res.status(500).send("Internal error");
  }
});

// Serve generator form on /generate
app.get("/generate", (req, res) => {
  res.render("generate", { shortUrl: null, qrCode: null });
});

// Handle form submission for generator
app.post("/generate", async (req, res) => {
  try {
    const body = req.body;
    const shortID = nanoid(8);

    if (!body.redirectUrl) {
      return res.status(400).send("URL required");
    }

    const host = req.protocol + "://" + req.get("host");
    const shortUrl = `${host}/api/url/${shortID}`;
    const qrCodeData = await QRCode.toDataURL(shortUrl);

    await url.create({
      shortId: shortID,
      redirectUrl: body.redirectUrl,
      qrCode: qrCodeData,
      visitHistory: [],
    });

    res.render("generate", {
      shortUrl,
      qrCode: qrCodeData,
    });
  } catch (err) {
    res.status(500).send("Internal error");
  }
});
