import React, { useState, useEffect, useContext } from "react";
import "../style/Banner.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import fetchingNewEpisode from "../utiles/fetchingNewEpisode";
import Context from "../context/context";
import fetchingExsistingEpisode from "../utiles/fetchingExsistingEpisode";
import didHeAlreadyBegin from "../utiles/didHeAlreadyBegin";

export default function Banner({ lunchingEpisode }) {
  // data one serie star
  const [wedette, setWedette] = useState([]);

  const {serverPath} = useContext(Context)
  //variable environnement

  const url = process.env.REACT_APP_DYNAMIC_IMG_PATH;

  useEffect(() => {
    /**
     * @param serverPath path server stack in .env
     * @param setState  hook useState
     * @param serverParams
     */
    const fetchWedette = async () => {
      const response = await fetch(`${serverPath}/serieSynopsis/2`);
      const data = await response.json();
      setWedette(data[0]);
    };
    fetchWedette();
  }, [serverPath]);
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
          src={wedette && wedette.image_lg ?`${url}/${wedette.image_lg}`:""}
          alt={wedette.title}
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

      <div className="wedetteDescription">
        <h3 className="wedetteTitle">{wedette.title}</h3>
        <p className="wedetteSynopsis">{wedette.body}</p>
      </div>
      </div>
      <img
        className="backgroundImg"
        src={wedette && wedette.image_bg ?`${url}/${wedette.image_bg}`:""}
        alt={`Bg_image ${wedette && wedette.title ? wedette.title : ""}`}
      />
    </div>
  );
}
