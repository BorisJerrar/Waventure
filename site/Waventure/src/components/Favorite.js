import React, { useState, useEffect } from 'react';
import Card from '../components/Card'
import getDataToken from "../utiles/getDataWithToken"

function Favorite({lunchingEpisodeVerificator}) {

    const [favoriteInfo, setFavoriteInfo] = useState([]);
    
    const transitionLunchingEpisodeVerificator = (transition) => {
    lunchingEpisodeVerificator(transition)
    }

    useEffect(() => {
        getDataToken("favoriteInfo", setFavoriteInfo, "")
    }, [])

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
                    lunchingEpisodeVerificator={(item) => {transitionLunchingEpisodeVerificator(item)}}
                />
            ))}
        </div>
    )
}

export default Favorite;