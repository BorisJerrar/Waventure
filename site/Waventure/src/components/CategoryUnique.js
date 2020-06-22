import React from "react";
import CategoryElement from "./CategoryElement";
import "../style/Categorie.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function CategoryUnique({
  item,
  settingHover,
  unsettingHover,
  lunchingEpisodeCategorie,
  information,
  urlimg,
  informationShow,
  url,
  synopsis,
  hover,
}) {
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
        <FontAwesomeIcon icon={['fas', 'heart']} />
        <FontAwesomeIcon icon={['far', 'heart']} />
        <CategoryElement
          classname="hoverInformationSynopsis"
          visibilityProps={information}
          ellement={synopsis}
        />
        <img
          className="InformationCategory"
          onClick={(e) => informationShow(e)}
          src={`${urlimg}/information.svg`}
          alt="information button"
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
          ellement="S2 Ep 4"
        />
        <CategoryElement
          classname="watchTime"
          visibilityProps={hover}
          ellement=""
        />
        <img
          style={
            information ? { visibility: "hidden" } : { visibility: "visible" }
          }
          className="playLogoCategory"
          src={`${urlimg}/btnPlay.svg`}
          alt="play button"
        />
      </div>
      <img
        className="imageSlideShow"
        src={`${url}/${item.image}`}
        alt={"cover of" + item.title}
      />
    </div>
  );
}
