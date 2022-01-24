const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const env = require("./env");
const videoRoutes = require("./routes/video.route");

const app = express();
const PORT = process.env.PORT || 8082;

const DB_URI = env.DB_URI;

mongoose
  .connect(`${DB_URI}`)
  .then(() => console.log("Connected to Vstream Database"))
  .catch((e) => console.log("Failed to connect to DB", e));

app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Vstream Backend Server");
});

app.use("/v1", videoRoutes);

app.listen(PORT, () => {
  console.log("Vstream Backend Server running at", PORT);
});
