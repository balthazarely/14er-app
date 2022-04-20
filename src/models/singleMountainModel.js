const StreamArray = require("stream-json/streamers/StreamArray");
const fs = require("fs");

const singleMountains = [];

const jsonStream = StreamArray.withParser();

//internal Node readable stream option, pipe to stream-json to convert it for us
fs.createReadStream(__dirname + "/mountainData.json").pipe(jsonStream.input);

//You'll get json objects here
//Key is the array-index here
jsonStream.on("data", (data) => {
  console.log(data);
  singleMountains.push(data);
});

jsonStream.on("end", () => {
  console.log("All Done");
});

function getSingleMoutainData() {
  console.log(singleMountains);
  return singleMountains;
}

module.exports = {
  getSingleMoutainData,
};
