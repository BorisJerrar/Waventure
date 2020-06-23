import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../style/FavoriteCard.css'

function FavoriteCard(item, index) {
    console.log(item)
    console.log(item.title)
    const url = process.env.REACT_APP_DYNAMIC_IMG_PATH;
    /*
        title={item.title}
        image={item.image}
        imageLg={item.image_lg}
        imageBg={item.image_bg}
        synopsis={item.body}
        duration={item.duration}
        season={item.season}
        author={item.author}
    */
    return (

        <div className="card">
                <img
                    className="card-bg"
                    src={`${url}/${item.imageLg}`}
                    alt={item.imageLg}
                />

                <div className="card-body">
                <h1 className="card-favorite-title">{item.title}</h1>
                    <div className="card-synopsis">
                    <p>{item.synopsis}</p>
                    </div>
                    <div className="card-footer">
                    <p>{item.season}</p>
                    <p>{item.duration}</p>
                    <p>{item.author}</p>
                    </div>
                </div>
            </div>
    );

}

export default FavoriteCard;