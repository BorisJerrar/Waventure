import React from 'react';
import '../style/Card.css'
import lunchinEpisodeCategorie from "../utiles/lunchinEpisodeCategorie";

function Card({item, lunchingEpisode, imageLg, season, duration, title, synopsis, author}) {
    const lunchingEpisodeCategorieUtils = (item) => {
        lunchinEpisodeCategorie(item, (serie_id, episode) => lunchingEpisode(serie_id, episode))
      }
    const url = process.env.REACT_APP_DYNAMIC_IMG_PATH;
    return (
        <div className="card" onClick={() => lunchingEpisodeCategorieUtils(item)}>
            <img
                className="card-bg"
                src={`${url}/${imageLg}`}
                alt={imageLg}
            />
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
    );

}

export default Card;