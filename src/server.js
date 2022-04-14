const http = require("http");
const app = require("./app");
const PORT = process.env.PORT || 8000;
const { loadMountainData } = require("./models/mountains.model");

const server = http.createServer(app);

async function startServer() {
  await loadMountainData();

  server.listen(PORT, () => {
    console.log(`listening on Port ${PORT}`);
  });
}

startServer();
