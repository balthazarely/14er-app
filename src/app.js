const express = require("express");
const app = express();
const cors = require("cors");
const { getMoutainData } = require("./models/mountains.model");

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.get("/mountains", (req, res) => {
  const allMountains = getMoutainData();
  return res.status(200).json(allMountains);
});

app.get("/mountains/:id", (req, res) => {
  const itemId = req.params.id;
  const item = getMoutainData().find((_item) => _item.ID === itemId);
  return res.status(200).json(item);
});

module.exports = app;
