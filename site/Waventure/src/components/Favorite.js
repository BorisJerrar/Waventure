import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from '../components/Card'

function Favorite({lunchingEpisodeVerificator}) {

const transitionLunchingEpisodeVerificator = (transition) => {
lunchingEpisodeVerificator(transition)
}

    const token = localStorage.getItem('token')
    const [favoriteInfo, setFavoriteInfo] = useState([]);

    useEffect(() => {
        const getFavoriteInfo = () => {
            var config = {
                method: 'get',
                url: 'http://localhost:4000/favoriteInfo',
                headers: {
                    'x-access-token': token
                }
            };
            axios(config)
                .then(function (response) {
                    setFavoriteInfo(response.data)
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
        getFavoriteInfo();
    }, [token])

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