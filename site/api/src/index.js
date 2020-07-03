const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const port = 4000;
const ms = require('mediaserver');
const http = require('http');
const dotenv = require('dotenv');
/* Add file */
const multer = require('multer')
const app = express();

dotenv.config();
app.use(cors());
/* import queries */

const serieByCategory = require("./queries/serie_serie_category_category");
const mainQueries = require("./queries/main");
const seasonQueries = require("./queries/season");
const categoryQueries = require("./queries/category");
const episodeQueries = require("./queries/episode");
const favoriteQueries = require("./queries/favorite");
const listenQueries = require("./queries/listen");
const roleQueries = require("./queries/role");
const actorQueries = require("./queries/actor");
const serieQueries = require("./queries/serie");
const serieActorQueries = require("./queries/serie_actor");
const serieCategoryQueries = require("./queries/serie_category");
const synopsisQueries = require("./queries/synopsis");
const accountQueries = require("./queries/account");
const avatarQueries = require("./queries/avatar");
const imageQueries = require("./queries/image")
const soundQueries = require("./queries/sound")
const Auth = require('./middleware/Auth.js');

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

/* add file */
/* var storage = multer.diskStorage({
  destination: function (req, file, cb) {
  cb(null, 'public')
},
filename: function (req, file, cb) {
  cb(null, Date.now() + '-' +file.originalname )
}
})

var upload = multer({ storage: storage }).single('file')

app.post('/upload',function(req, res) {
     
  upload(req, res, function (err) {
         if (err instanceof multer.MulterError) {
             return res.status(500).json(err)
         } else if (err) {
             return res.status(500).json(err)
         }
    return res.status(200).send(req.file)

  })

}); */
/* End add file */

app.get("/", (request, response) => {
  response.json({});
});

app.get("/images/:image", imageQueries.getImage);

app.get('/sound/', soundQueries.getSound );

/* MAIN */
app.get("/sagaInfo/:serie_id", mainQueries.getSagaInfosBySerieId);
app.get("/serieSynopsis", mainQueries.getSerieSynopsis)
app.get("/serieRole/:id", mainQueries.getSerieRole )
app.get("/serieSynopsis/:id", mainQueries.getSerieSynopsisBySerieId)

/* AUTH */
app.post('/auth/signin', accountQueries.loginAccount)
app.post("/auth/signup", accountQueries.createAccount);
app.post("/auth/pwdReset", accountQueries.SendEmailresetPassword);
app.put("/auth/reset", Auth.verifyToken, accountQueries.resetPasswordByEmail);
app.get("/serieCategory/:categoryName", serieByCategory.getSerieByCategory )

/* ACCOUNT */ 
app.get("/account", Auth.verifyToken, accountQueries.getAccount);
app.get("/account/:account_id", accountQueries.getAccountById);
app.put("/account/:account_id", accountQueries.updateAccount);
app.delete("/account", Auth.verifyToken, accountQueries.deleteAccount);

/* SERIE */ 
app.get("/serie", serieQueries.getSerie);
app.get("/serie/:serie_id", serieQueries.getSerieById);
app.get("/serieUploades/", serieQueries.getSerieByUploadDate);
app.post("/serie", serieQueries.createSerie);
app.put("/serie/:serie_id", serieQueries.updateSerie);
app.delete("/serie/:serie_id", serieQueries.deleteSerie);

/* SERIE ACTOR */
app.get("/serie_actor", serieActorQueries.getSerieActor);
app.get("/serie_actor/:serie_actor_id", serieActorQueries.getSerieActorById);
app.post("/serie_actor", serieActorQueries.createSerieActor);
app.put("/serie_actor/:serie_actor_id", serieActorQueries.updateSerieActor);
app.delete("/serie_actor/:serie_actor_id", serieActorQueries.deleteSerieActor);

/* SERIE CATEGORY */
app.get("/serie_category", serieCategoryQueries.getSerieCategory);
app.get("/serie_category/:serie_category_id", serieCategoryQueries.getSerieCategoryById);
app.post("/serie_category", serieCategoryQueries.createSerieCategory);
app.put("/serie_category/:serie_category_id", serieCategoryQueries.updateSerieCategory);
app.delete("/serie_category/:serie_category_id", serieCategoryQueries.deleteSerieCategory);

/* SEASON */
app.get("/season", seasonQueries.getSeason);
app.get("/season/:season_id", seasonQueries.getSeasonById);
app.post("/season", seasonQueries.createSeason);
app.put("/season/:season_id", seasonQueries.updateSeason);
app.delete("/season/:season_id", seasonQueries.deleteSeason);

/* EPISODE */
app.get("/episode", episodeQueries.getEpisode);
app.get("/episode/:episode_id", episodeQueries.getEpisodeById);
app.get("/saisonAndEpisode/:serie_id", episodeQueries.getEpisodeBySeasonAndSaga);
app.get("/episodeNumber/:episode_nb", episodeQueries.getEpisodeByEpisodeNumber);
app.post("/episode", episodeQueries.createEpisode);
app.put("/episode/:episode_id", episodeQueries.updateEpisode);
app.delete("/episode/:episode_id", episodeQueries.deleteEpisode);

/* SYNOPSIS */
app.get("/synopsis", synopsisQueries.getSynopsis);
app.get("/synopsis/:synopsis_id", synopsisQueries.getSynopsisById);
app.post("/synopsis", synopsisQueries.createSynopsis);
app.put("/synopsis/:synopsis_id", synopsisQueries.updateSynopsis);
app.delete("/synopsis/:synopsis_id", synopsisQueries.deleteSynopsis);

/* CATEGORY */
app.get("/category", categoryQueries.getCategory);
app.get("/category/:category_id", categoryQueries.getCategoryById);
app.post("/category", categoryQueries.createCategory);
app.put("/category/:category_id", categoryQueries.updateCategory);
app.delete("/category/:category_id", categoryQueries.deleteCategory);

/* FAVORITE */
app.get("/favorite", Auth.verifyToken, favoriteQueries.getFavorites);
app.get("/favoriteInfo", Auth.verifyToken, favoriteQueries.getFavoritesInfo);
app.get("/favorite/:serie_id", Auth.verifyToken, favoriteQueries.getFavoritesById);
app.post("/favorite/:serie_id", Auth.verifyToken, favoriteQueries.createFavorites);
app.delete("/favorite/:serie_id", Auth.verifyToken, favoriteQueries.deleteFavorites);

/* LISTEN */
app.get("/listen", listenQueries.getListen)
app.post("/listen", Auth.verifyToken, listenQueries.addListen);
app.get("/listenVerificator/", Auth.verifyToken, listenQueries.getListenById);
app.put("/listen", Auth.verifyToken, listenQueries.updateListen);
app.delete("/listen", listenQueries.deleteListen);

/* ROLE */
app.get("/role", roleQueries.getRole);
app.get("/role/:role_id", roleQueries.getRoleById);
app.post("/role", roleQueries.createRole);
app.put("/role/:role_id", roleQueries.updateRole);
app.delete("/role/:role_id", roleQueries.deleteRole);

/* ACTOR */
app.get("/actor", actorQueries.getActor);
app.get("/actor/:actor_id", actorQueries.getActorById);
app.post("/actor", actorQueries.createActor);
app.put("/actor/:actor_id", actorQueries.updateActor);
app.delete("/actor/:actor_id", actorQueries.deleteActor);

/* AVATAR */
app.get("/avatar", avatarQueries.getAvatar);
app.get("/avatarByUser", avatarQueries.getAvatarByUser);
app.listen(port, () => {
  console.log("Running on port " + port);
});
