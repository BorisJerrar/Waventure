import React from "react";
import CategoryElement from "./CategoryElement";
import "../style/Categorie.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';

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
  favorite,
}) {

  const server = process.env.REACT_APP_SERVER_PATH;
  const token = localStorage.getItem('token')



  const handleFavorite = () => {

    var addConfig = {
      method: 'POST',
      url: `${server}/favorite/${item.serie_id}`,
      headers: {
        'x-access-token': token
      }
    };
    var removeConfig = {
      method: 'DELETE',
      url: `${server}/favorite/${item.serie_id}`,
      headers: {
        'x-access-token': token
      }
    };

    const addFavorite = async () => {
      axios(addConfig)
        .then(function (response) {
          console.log(response.data)
        })
        .catch(function (error) {
          console.log(error);
        });
    }
    const removeFavorite = async () => {
      axios(removeConfig)
        .then(function (response) {
          console.log(response.data)
        })
        .catch(function (error) {
          console.log(error);
        })
    }

    if (favorite === false) {
      addFavorite();
    } else {
      removeFavorite();
    }
  }

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
        {favorite === false ? <FontAwesomeIcon
          className="hoverInformationHeart"
          onClick={(e) => handleFavorite(e)}
          icon={['far', 'heart']} size="2x" /> :
          <FontAwesomeIcon
            className="hoverInformationHeart"
            onClick={(e) => handleFavorite(e)}
            icon={['fas', 'heart']} size="2x" />}


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
