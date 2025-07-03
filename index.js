import express from "express";
import routes from "./routes/routes.js";

const app = express();
const PORT = 3000;
app.use(express.json());
app.listen(PORT, () => {
  return console.log(`Server is listening on http://localhost:${PORT}`);
});

app.use("/data", routes);
app.get("/get", (req, res) => {
  return res.status(200).json({
    message: "this is dummy page",
    status: "success",
  });
});
