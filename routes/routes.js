import express from "express";
import postRequest from "../controllers/data.js";

const routes = express.Router();

routes.post("/", postRequest);

export default routes;
