import express from "express";
import router from "./routes/routes.js";
import middleware from "./middleware/index.js";
import connect from "./connection.js";
import dotenv from "dotenv";
import path from "path";

dotenv.config();

//init express
const app = express();

//ejs setup
app.set("view engine", "ejs");
app.set("views", path.join(path.resolve(), "views"));

//Custome middleware
app.use(express.json());
app.use(middleware("./log.txt"));

//port
const PORT = 3000;

//Database Connection
const DB_URL = process.env.MONGODATABASE_URL;
connect(DB_URL);

//Routes
app.use("/api/url", router);

//app listener
app.listen(PORT, () => {
  return console.log(`Server is listening on http://localhost:${PORT}`);
});
