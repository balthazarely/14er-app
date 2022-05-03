const fs = require("fs");
const { parse } = require("csv-parse");
const mountain = require("./mountains.mongo");
const FavoriteMountain = require("./favoriteMountain.mongo");

function loadMountainData() {
  return new Promise((resolve, reject) => {
    fs.createReadStream(__dirname + "/14er.csv")
      .pipe(
        parse({
          columns: true,
        })
      )
      .on("data", async (data) => {
        createMountainsInDb(data);
      })
      .on("error", (err) => {
        console.log(err);
        reject(err);
      })
      .on("end", async () => {
        console.log(` 🌍 mountains have been found!`);
        resolve();
      });
  });
}

async function getAllMoutains() {
  return await mountain.find({});
}

async function getMountain(id) {
  return await mountain.find({
    ID: id,
  });
}

async function createMountainsInDb(mountain) {
  try {
    await mountain.updateOne({ mountain }, { mountain }, { upsert: true });
  } catch (err) {
    console.log(err);
  }
}

async function runCode() {
  const newFavMount = new FavoriteMountain({
    id: "1234asf5678fas9",
    name: "Mt Massive",
  });
  const doc = await newFavMount.save();
  console.log(doc);
}

async function getAllFavoriteMoutains() {
  let favy = await FavoriteMountain.find({});
  console.log(favy);
  return favy;
}

// runCode().catch((error) => {
//   console.error(error);
// });
// getAllFavoriteMoutains().catch((error) => {
//   console.error(error);
// });

module.exports = {
  loadMountainData,
  getAllMoutains,
  getMountain,
};
