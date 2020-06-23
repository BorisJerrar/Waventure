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
                    console.log(JSON.stringify(response.data));
                    setFavoriteInfo(response.data)
                })
                .catch(function (error) {
                    console.log(error);
                });
        }

        getFavoriteInfo();
    }, [])


    return (
        <div>
            {favoriteInfo.map((item, index) => (
                <FavoriteCard
                    index={index}
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