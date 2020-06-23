import React from "react";
import CategoryElement from "./CategoryElement";
import "../style/Categorie.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState, useEffect } from "react";
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
}) {

  const server = process.env.REACT_APP_SERVER_PATH;
  const [favorite, setFavorite] = useState(false)
  const token = localStorage.getItem('token')

  const handleFavorite = (e) => {
    e.stopPropagation();
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
          fetchFavorite();
        })
        .catch(function (error) {
          console.log(error);
        });
    }
    const removeFavorite = async () => {
      axios(removeConfig)
        .then(function (response) {
          console.log(response.data)
          fetchFavorite();
        })
        .catch(function (error) {
          console.log(error);
        })
    }

    var config = {
      method: 'get',
      url: `${server}/favorite/${item.serie_id}`,
      headers: {
        'x-access-token': token
      }
    };
    const fetchFavorite = async () => {
      axios(config)
        .then(function (response) {
          setFavorite(response.data[0].exists)
        })
        .catch(function (error) {
          console.log(error);
        });
    }
    if (favorite === false) {
      addFavorite();
    } else {
      removeFavorite();
    }
  }

  useEffect(() => {
    var config = {
      method: 'get',
      url: `${server}/favorite/${item.serie_id}`,
      headers: {
        'x-access-token': token
      }
    };
    const fetchFavorite = async () => {
      axios(config)
        .then(function (response) {
          setFavorite(response.data[0].exists)
        })
        .catch(function (error) {
          console.log(error);
        });
    }
    fetchFavorite();
  }, [server, item, token])


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
          icon={['far', 'heart']} size="sm" /> :
          <FontAwesomeIcon
            className="hoverInformationHeart"
            onClick={(e) => handleFavorite(e)}
            icon={['fas', 'heart']} size="sm" />}


        <CategoryElement
          classname="hoverInformationSynopsis"
          visibilityProps={information}
          ellement={synopsis}
        />
        <FontAwesomeIcon
          className="InformationCategory"
          onClick={(e) => informationShow(e)}
          icon={['far', 'question-circle']} size="sm"
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
        <FontAwesomeIcon
          style={
            information ? { visibility: "hidden" } : { visibility: "visible" }
          }
          className="playLogoCategory"
          icon={['fas', 'play-circle'] }
          size="2x"
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
