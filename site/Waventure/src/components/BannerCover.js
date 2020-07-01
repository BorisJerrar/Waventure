import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import fetchingNewEpisode from "../utiles/fetchingNewEpisode";
import fetchingExsistingEpisode from "../utiles/fetchingExsistingEpisode";
import didHeAlreadyBegin from "../utiles/didHeAlreadyBegin";

export default function BannerCover({wedette, lunchingEpisode, url}) {
    
/* First of all, cheking if user has already begun the audiodrama on click*/
    const lunchingEpisodeCategorie = (item) => {
        didHeAlreadyBegin(item, function (config) {
          axios(config)
            .then(function (response) {
              /* If not, lunching first episode of the audiodrama cliked*/
              if (response.data.length === 0) {
                fetchingNewEpisode(item, function (fetchconfig) {
                  axios(fetchconfig)
                    .then(function (response) {
                      return lunchingEpisode(item.serie_id, 0);
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
                  lunchingEpisode(
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
    return (
        <div
        className="wedetteCover"
        onClick={() => lunchingEpisodeCategorie(wedette)}
      >
        <img
          className="wedetteCoverImage"
          src={wedette && wedette.image_lg ?`${url}/${wedette.image_lg}`:""}
          alt={wedette.title}
        />
        <FontAwesomeIcon
          className="btnPlay"
          icon={["fa", "play-circle"]}
          size="4x"
        />
      </div>
    )
}
