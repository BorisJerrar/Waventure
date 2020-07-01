import { useState, useEffect, useContext } from "react";
import CategoryElement from "./CategoryElement";
import "../style/Categorie.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Context from "../context/context";
import addFavorite from "../utiles/addFavorite";
import removeFavorite from "../utiles/removeFavorite";
import fetchFavorite from "../utiles/fetchFavorite";
import fetchingExsistingEpisode from "../utiles/fetchingExsistingEpisode";
import didHeAlreadyBegin from "../utiles/didHeAlreadyBegin";
import axios from "axios";
// this comment tells babel to convert jsx to calls to a function called jsx instead of React.createElement
/** @jsx jsx */
import { css, jsx } from '@emotion/core'

export default function CategoryUnique({
  item,
  settingHover,
  unsettingHover,
  lunchingEpisodeCategorie,
  information,
  informationShow,
  url,
  synopsis,
  hover,
}) {
  const { token, serverPath } = useContext(Context);
  const [favorite, setFavorite] = useState(false);
  const [
    episodeEpisodeandSeasonInfo,
    setEpisodeEpisodeandSeasonInfo,
  ] = useState("");
  const [indexWithSeason, setIndexWithSeason] = useState();
  const [viewPercentage, setViewPercentage] = useState(0);

  const handleFavorite = (e) => {
    e.stopPropagation();
    if (favorite === false) {
      addFavorite(serverPath, item.serie_id, token, () => {
        fetchFavorite(serverPath, item.serie_id, token, setFavorite);
      });
    } else {
      removeFavorite(serverPath, item.serie_id, token, () => {
        fetchFavorite(serverPath, item.serie_id, token, setFavorite);
      });
    }
  };

  useEffect(() => {
    fetchFavorite(serverPath, item.serie_id, token, setFavorite);
    const advancmentChecker = (item) => {
      didHeAlreadyBegin(item, function (config) {
        axios(config)
          .then(function (response) {
            /* If not, lunching first episode of the audiodrama cliked*/
            if (response.data.length === 0) {
              setEpisodeEpisodeandSeasonInfo("S1 : E1");
            } else {
              fetchingExsistingEpisode(...response.data, function (
                item,
                response
              ) {
                setIndexWithSeason(
                  response.findIndex(
                    (UniqueItem) => UniqueItem.episode_id === item.episode_id
                  )
                );
                setViewPercentage((indexWithSeason * 100) / response.length);
                  setEpisodeEpisodeandSeasonInfo(`S${response[response.findIndex(
                    (UniqueItem) => UniqueItem.episode_id === item.episode_id
                  )].season_nb} : E${response[response.findIndex(
                    (UniqueItem) => UniqueItem.episode_id === item.episode_id
                  )].episode_nb}`)
              });
            }
          })
          .catch(function (error) {
            console.log(error);
          });
      });
    };
    advancmentChecker(item);
  }, [serverPath, item, token, indexWithSeason]);
  return (
    <div
      className={"hoverInformationContainer"}
      onMouseEnter={() => settingHover(item)}
      onMouseLeave={() => unsettingHover()}
    >
      <div
        className="hoverInformation"
        onClick={() => {
          lunchingEpisodeCategorie(item);
        }}
      >
        {favorite === false ? (
          <FontAwesomeIcon
            className="hoverInformationHeart"
            onClick={(e) => handleFavorite(e)}
            icon={["far", "heart"]}
            size="sm"
            style={{ opacity: information ? 0 : 1 }}
          />
        ) : (
          <FontAwesomeIcon
            className="hoverInformationHeart"
            onClick={(e) => handleFavorite(e)}
            icon={["fas", "heart"]}
            size="sm"
            style={{ opacity: information ? 0 : 1 }}
          />
        )}

        <CategoryElement
          classname="hoverInformationSynopsis"
          visibilityProps={information}
          ellement={synopsis}
        />
        <FontAwesomeIcon
          className="InformationCategory"
          onClick={(e) => informationShow(e)}
          icon={["far", "question-circle"]}
          size="sm"
        />
        <CategoryElement
          classname="hoverInformationTitle"
          visibilityProps={hover}
          ellement={item.title}
        />
        <CategoryElement
          classname="hoverInformationAuthor"
          visibilityProps={hover}
          ellement={item.author}
        />
        <CategoryElement
          classname="hoverInformationEpisode"
          visibilityProps={hover}
          ellement={episodeEpisodeandSeasonInfo}
        />
        <p
          className="watchTime"
          css={css`
          &:after {
            width: ${viewPercentage}%;
          }
        `}
          style={
            hover
              ? { visibility: "visible", opacity: 1 }
              : { visibility: "hidden", opacity: 0 }
          }
        ></p>
        <FontAwesomeIcon
          style={
            information ? { visibility: "hidden" } : { visibility: "visible" }
          }
          className="playLogoCategory"
          icon={["fas", "play-circle"]}
          size="2x"
        />
      </div>
      <img
        className="imageSlideShow"
        src={`${url}/${item.image_lg}`}
        alt={"cover of" + item.title}
      />
    </div>
  );
}
