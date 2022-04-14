const fs = require("fs");
const { parse } = require("csv-parse");

const mountains = [];

function loadMountainData() {
  console.log("hi from moutnains");
  return new Promise((resolve, reject) => {
    fs.createReadStream(__dirname + "/14er.csv")
      .pipe(
        parse({
          columns: true,
        })
      )
      .on("data", (data) => {
        mountains.push(data);
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

function getMoutainData() {
  console.log(mountains);
  return mountains;
}

module.exports = {
  loadMountainData,
  getMoutainData,
};
