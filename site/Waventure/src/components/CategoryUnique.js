import React, { useState, useEffect, useContext } from "react";
import CategoryElement from "./CategoryElement";
import "../style/Categorie.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Context from "../context/context";
import axios from 'axios';

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
  const {token, serverPath } = useContext(Context);
  const [favorite, setFavorite] = useState(false)

  const handleFavorite = (e) => {
    e.stopPropagation();
    var addConfig = {
      method: 'POST',
      url: `${serverPath}/favorite/${item.serie_id}`,
      headers: {
        'x-access-token': token
      }
    };
    var removeConfig = {
      method: 'DELETE',
      url: `${serverPath}/favorite/${item.serie_id}`,
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
      url: `${serverPath}/favorite/${item.serie_id}`,
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
      url: `${serverPath}/favorite/${item.serie_id}`,
      headers: {
        'x-access-token': token
      }
    };
    let mounted = true;
    const fetchFavorite = async () => {
      axios(config)
        .then(function (response) {
          if(mounted) {
          setFavorite(response.data[0].exists)
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
    fetchFavorite()
  
    return () =>  mounted = false
  }, [serverPath, item, token])
  
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
          icon={['far', 'heart']} size="sm" style={{opacity: information?0:1}}/> :
          <FontAwesomeIcon
            className="hoverInformationHeart"
            onClick={(e) => handleFavorite(e)}
            icon={['fas', 'heart']} size="sm" style={{opacity: information?0:1}}/>}

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
