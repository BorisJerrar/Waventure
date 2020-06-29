import React, { useState, useEffect } from "react";
import "../style/Banner.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import fetchingNewEpisode from "../utiles/fetchingNewEpisode";
import fetchingExsistingEpisode from "../utiles/fetchingExsistingEpisode";
import didHeAlreadyBegin from "../utiles/didHeAlreadyBegin";

export default function Banner({ lunchingEpisode }) {
  const token = localStorage.getItem("token");

  // data one serie star
  const [wedette, setWedette] = useState([]);

  //variable environnement
  const server = process.env.REACT_APP_SERVER_PATH;
  const url = process.env.REACT_APP_DYNAMIC_IMG_PATH;

  useEffect(() => {
    /**
     * @param serverPath path server stack in .env
     * @param setState  hook useState
     * @param serverParams
     */
    const fetchWedette = async () => {
      const response = await fetch(`${server}/serieSynopsis/1`);
      const data = await response.json();
      setWedette(data[0]);
    };
    fetchWedette();
  }, [server]);
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
    <div className={"wedetteContainer"}>
      <div
        className="wedetteCover"
        onClick={() => lunchingEpisodeCategorie(wedette)}
      >
        <img
          className="wedetteCoverImage"
          src={`${url}/${wedette && wedette.image_lg ? wedette.image_lg : ""}`}
          alt=""
        />
        <FontAwesomeIcon
          className="btnPlay"
          icon={["fa", "play-circle"]}
          size="4x"
        />
      </div>
      <div className="wedetteLogoContainer">
        <span>
          <img src="./img/logoWedette.svg" alt="W" />
        </span>
        <h2 className="wedetteIndicator">edette</h2>
      </div>

      <div className="wedetteDescription">
        <h3 className="wedetteTitle">{wedette.title}</h3>
        <p className="wedetteSynopsis">{wedette.body}</p>
      </div>
      <img
        className="backgroundImg"
        src={`${url}/${wedette && wedette.image_bg ? wedette.image_bg : ""}`}
        alt={`Bg_image ${wedette && wedette.title ? wedette.title : ""}`}
      />
    </div>
  );
}
