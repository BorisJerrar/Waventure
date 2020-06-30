import axios from "axios";
import fetchingNewEpisode from "../utiles/fetchingNewEpisode";
import fetchingExsistingEpisode from "../utiles/fetchingExsistingEpisode";
import didHeAlreadyBegin from "../utiles/didHeAlreadyBegin";
const lunchingEpisodeCategorie = (item, callback) => {
    didHeAlreadyBegin(item, function (config) {
      axios(config)
        .then(function (response) {
          /* If not, lunching first episode of the audiodrama cliked*/
          if (response.data.length === 0) {
            fetchingNewEpisode(item, function (fetchconfig) {
              axios(fetchconfig)
                .then(function (response) {
                  return callback(item.serie_id, 0);
                })
                .catch(function (error) {
                  console.log(error);
                });
            });
                      /*  If yes, fetching datas, and resuming episode*/
          } else {
            fetchingExsistingEpisode(...response.data, function (
              item,
              response
            ) {
              callback(
                item.serie_id,
                response.findIndex(
                  (UniqueItem) => UniqueItem.episode_id === item.episode_id
                )
              );
            });
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    });
  };
  export default lunchingEpisodeCategorie