import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FavoriteCard from '../components/FavoriteCard'

function Favorite(props) {

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
                <FavoriteCard
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
                />
            ))}
        </div>
    )
}

export default Favorite;