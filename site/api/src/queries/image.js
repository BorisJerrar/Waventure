const db = require('../../db/database')
const fs = require("fs");


const getImage = (req, res) => {
    let image = req.params.image;
  
    let read = fs.createReadStream(`./src/img/${image}`);
    read.on("open", () => {
      res.set("Content-Type", "image/jpeg");
      read.pipe(res);
    });
  }

  module.exports = { getImage }