const express = require("express");
const app = express();
const cors = require("cors");

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.use(express.json());

const {
  httpGetAllMountains,
  httpGetMountain,
} = require("./controllers/mountains.controller");
const {
  httpGetAllFavoriteMountains,
  httpAddFavoriteMountains,
} = require("./controllers/favoriteMountain.controller");
const FavoriteMountain = require("./models/favoriteMountain.mongo");

app.get("/mountains", httpGetAllMountains);
app.get("/mountains/:id", httpGetMountain);
app.get("/favoriteMountains", httpGetAllFavoriteMountains);
app.post("/favoriteMountains", async (req, res, next) => {
  try {
    const { id, name } = req.body;
    const favoriteMountain = new FavoriteMountain({ id, name });
    const result = await favoriteMountain.save();
    // res.json(result);
    return res.send(result);
  } catch (error) {
    return next(error);
  }
});
app.delete("/favoriteMountains", async function (req, res) {
  await FavoriteMountain.findOneAndDelete({
    id: req.body.id,
    name: req.body.name,
  });
});

module.exports = app;
