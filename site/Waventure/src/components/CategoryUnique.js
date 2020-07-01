import React, { useState, useEffect, useContext } from "react";
import CategoryElement from "./CategoryElement";
import "../style/Categorie.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Context from "../context/context";
import addFavorite from "../utiles/addFavorite";
import removeFavorite from "../utiles/removeFavorite";
import fetchFavorite from "../utiles/fetchFavorite";

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

  const handleFavorite = (e) => {
    e.stopPropagation();
    if (favorite === false) {
      addFavorite(serverPath, item.serie_id, token,() => {
        fetchFavorite(serverPath, item.serie_id, token, setFavorite);
      });
    } else {
      removeFavorite(serverPath, item.serie_id, token,() => {
        fetchFavorite(serverPath, item.serie_id, token, setFavorite);
      });
    }
  };

  useEffect(() => {
    fetchFavorite(serverPath, item.serie_id, token, setFavorite);
  }, [serverPath, item, token]);
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
          ellement={""}
        />
        <CategoryElement
          classname="watchTime"
          visibilityProps={hover}
          ellement=""
        />
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
