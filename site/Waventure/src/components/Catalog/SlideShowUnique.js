import { useState, useEffect, useContext } from "react";
import SlideShowElement from "./SlideShowElement";
import "../../style/Categorie.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Context from "../../context/context";
import addFavorite from "../../utiles/addFavorite";
import removeFavorite from "../../utiles/removeFavorite";
import fetchFavorite from "../../utiles/fetchFavorite";
import fetchingExsistingEpisode from "../../utiles/fetchingExsistingEpisode";
import didHeAlreadyBegin from "../../utiles/didHeAlreadyBegin";
import axios from "axios";
// this comment tells babel to convert jsx to calls to a function called jsx instead of React.createElement
/** @jsx jsx */
import { css, jsx } from "@emotion/core";

export default function SlideShowUnique({
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
  const { token, serverPath, activating} = useContext(Context);
  const [favorite, setFavorite] = useState(false);

  const [
    episodeEpisodeandSeasonInfo,
    setEpisodeEpisodeandSeasonInfo,
  ] = useState("Chargement...");
  const [indexWithSeason, setIndexWithSeason] = useState(0);
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
    let unmounted = false;
    if (!unmounted) {
      fetchFavorite(serverPath, item.serie_id, token, setFavorite);
    }
    const advancmentChecker = (item) => {
      didHeAlreadyBegin(item, function (config) {
        axios(config)
          .then(function (response) {
            /* If not, lunching first episode of the audiodrama cliked*/
            if (response.data.length === 0) {
              if (!unmounted) {
                setEpisodeEpisodeandSeasonInfo("S1 : E1");
              }
            } else {
              if (!unmounted) {
                fetchingExsistingEpisode(...response.data, function (
                  item,
                  response
                ) {
                  if (!unmounted) {
                    setIndexWithSeason(
                      response.findIndex(
                        (UniqueItem) =>
                          UniqueItem.episode_id === item.episode_id
                      )
                    );
                    if (!unmounted) {
                      setViewPercentage(
                        (indexWithSeason * 100) / response.length
                      );
                    }
                    if (!unmounted) {
                      setEpisodeEpisodeandSeasonInfo(
                        `S${
                          response[
                            response.findIndex(
                              (UniqueItem) =>
                                UniqueItem.episode_id === item.episode_id
                            )
                          ].season_nb
                        } : E${
                          response[
                            response.findIndex(
                              (UniqueItem) =>
                                UniqueItem.episode_id === item.episode_id
                            )
                          ].episode_nb
                        }`
                      );
                    }
                  }
                });
              }
            }
          })
          .catch(function (error) {
            console.log(error);
          });
      });
    };
    advancmentChecker(item);
    return () => {
      unmounted = true;
    };
  }, [serverPath, item, token, indexWithSeason, setFavorite, activating]);
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

        <SlideShowElement
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
        <SlideShowElement
          classname="hoverInformationTitle"
          visibilityProps={hover}
          ellement={item.title}
        />
        <SlideShowElement
          classname="hoverInformationAuthor"
          visibilityProps={hover}
          ellement={item.author}
        />
        <SlideShowElement
          classname="hoverInformationEpisode"
          visibilityProps={hover}
          ellement={episodeEpisodeandSeasonInfo}
        />
        <p
          className="watchTime"
          css={
            viewPercentage
              ? css`
                  &:after {
                    width: ${viewPercentage}%;
                  }
                `
              : css`
                  &:after {
                    width: 0%;
                  }
                `
          }
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
