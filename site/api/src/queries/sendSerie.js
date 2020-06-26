const fs = require('fs')
let increment = 0

const sendSerie = (req, res)=>{
    increment ++
    console.log(req.body);
fs.writeFile(`upload/${req.body.title}_${increment}.txt`, `account_id: ${req.body.account}\r\nemail: ${req.body.email}\r\ntitle: ${req.body.title}\r\nsynopsis: ${req.body.body}`, (err)=>{
if(err) return console.log(err);
})
    
}

module.exports = {
    sendSerie,
  };