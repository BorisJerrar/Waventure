import React, { useState, useEffect } from 'react';
import Card from '../components/Card'
import getDataToken from "../utiles/getDataWithToken"

function Favorite({lunchingEpisode}){
    const [favoriteInfo, setFavoriteInfo] = useState([]);
    useEffect(() => {
        getDataToken("favoriteInfo", setFavoriteInfo, "")
    }, [])
    if(favoriteInfo.length !== 0){
    return (
        <div className="tab-content">
            {favoriteInfo.map((item, index) => (
                <Card
                    key={index}
                    item={item}
                    title={item.title}
                    image={item.image}
                    imageLg={item.image_lg}
                    imageBg={item.image_bg}
                    synopsis={item.body}
                    duration={item.duration}
                    season={item.season}
                    author={item.author}
                    lunchingEpisode={(serie_id, episode) => lunchingEpisode(serie_id, episode)}
                />
            ))}
        </div>
    )} else{
        return(
            <div className="tab-content">
        <p className="card-favorite-title centering">Vous n'avez pas encore de coup de coeur</p>
        </div>
        )
    }
}

export default Favorite;