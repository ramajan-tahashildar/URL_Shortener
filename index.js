import express from "express";
import middleware from "./middleware/index.js";
import connect from "./connection.js";
import dotenv from "dotenv";
import router from "./routes/routes.js";
import userRouter from "./routes/user.js";
import cookieParser from "cookie-parser";
import restrictedToLoggedInUsers from "./middleware/auth.js";

//}

dotenv.config();

//init express
const app = express();

//Custome middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // for form data (HTML forms)
app.use(cookieParser());

app.use(middleware("./log.txt"));

//port
const PORT = 3000;

//Database Connection
const DB_URL = process.env.MONGODATABASE_URL;
connect(DB_URL);

//Routes
app.use("/api/url", restrictedToLoggedInUsers, router);
app.use("/user", userRouter);

//app listener
app.listen(PORT, "0.0.0.0", () => {
  return console.log(`Server is listening on http://localhost:${PORT}`);
});
