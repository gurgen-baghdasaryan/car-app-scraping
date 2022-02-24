const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const adapter = new FileSync("db.json");
const db = low(adapter);
db.defaults({ scraper: [] }).write();
// Importamos la función scraper de la carpeta utils
const scraper = require("../utils/scraper");

module.exports = {
  getData: async (req, res) => {
    try {
      const data =  db.get("scraper").filter().value();
      console.log(data);
      if (data.length == 0) {
        const result = await scraper.scraper("https://www.dasweltauto.es/esp/");
        console.log("result en getData", result);
        console.log(result);
        //  db.get("scraper").push(result).write();
         db.get('scraper')
          .assign(result)
          .write();

        res.json(result);
      } else {
        console.log("*****************");
        res.json(data);
      }
    } catch (err) {
      console.log(err.message);
      res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  },
};
