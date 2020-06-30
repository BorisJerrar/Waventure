import React, {useContext, useState, useEffect} from 'react';
import Context from "../context/context";
import '../style/Card.css'
import lunchinEpisodeCategorie from "../utiles/lunchinEpisodeCategorie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import removeFavorite from "../utiles/removeFavorite";
import addFavorite from "../utiles/addFavorite";
import fetchFavorite from "../utiles/fetchFavorite";

function Card({item, lunchingEpisode, imageLg, season, duration, title, synopsis, author}) {
    const { token, serverPath } = useContext(Context);
    const [ favorite, setFavorite ] = useState(false);
    const lunchingEpisodeCategorieUtils = (item) => {
        lunchinEpisodeCategorie(item, (serie_id, episode) => lunchingEpisode(serie_id, episode))
      }
      useEffect(() => {
          console.log('pipi');
          
        fetchFavorite(serverPath, item.serie_id, token, setFavorite);
      }, [serverPath, item, token, setFavorite]);
      const handleFavorite = (e) => {
          e.stopPropagation();
          console.log('pipi');
          if (favorite === false) {
            addFavorite(serverPath, item.serie_id, token,() => {
                fetchFavorite(serverPath, item.serie_id, token, setFavorite);
            });
          } else {
            removeFavorite(serverPath, item.serie_id, token, () => {
                fetchFavorite(serverPath, item.serie_id, token, setFavorite);
            });
          }
    };
    

    const url = process.env.REACT_APP_DYNAMIC_IMG_PATH;
    return (
        <div className="card" onClick={() => lunchingEpisodeCategorieUtils(item)}>
            <img
                className="card-bg"
                src={`${url}/${imageLg}`}
                alt={imageLg}
            />
        {favorite === false ? (
          <FontAwesomeIcon
            className="hoverInformationHeart"
            onClick={(e) => handleFavorite(e)}
            icon={["far", "heart"]}
            size="sm"
          />
        ) : (
          <FontAwesomeIcon
            className="hoverInformationHeart"
            onClick={(e) => handleFavorite(e)}
            icon={["fas", "heart"]}
            size="sm"
          />
        )}
<div className="card-body">
                <h1 className="card-favorite-title">{title}</h1>
                <div className="card-info">
                    <p><span className="season-nb">saison: {season}</span></p>
                    <p><span className="duration">durée: {duration}</span></p>
                    <p><span className="author">{author}</span></p>
                </div>
                <div className="card-synopsis">
                    <p>{synopsis}</p>
                </div>
                <div className="card-footer">
                </div>
            </div>
        </div>
    )
}

export default Card;