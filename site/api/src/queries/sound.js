const ms = require('mediaserver');

const getSound = (req, res)=>{
    let sound = req.query.sound;
    let saga = req.query.saga;
    ms.pipe(req, res, `./src/sound/${saga}/${sound}`);
}

module.exports= { getSound }
