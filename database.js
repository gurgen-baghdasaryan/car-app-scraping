const low = require("lowdb");
const FileAsync = require("lowdb/adapters/FileAsync");
const scraper = require("./utils/scraper");

let db;

async function createConnection() {
  const adapter = new FileAsync("db.json");
  db = await low(adapter);
  db.defaults({ scraper: [] }).write();
}

const getConnection = () => db;

module.exports = {
  createConnection,
  getConnection,
};
