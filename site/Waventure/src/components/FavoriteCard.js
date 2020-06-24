import React from 'react';
import '../style/FavoriteCard.css'

function FavoriteCard(item, index) {
    const url = process.env.REACT_APP_DYNAMIC_IMG_PATH;
    return (
        <div className="card">
            <img
                className="card-bg"
                src={`${url}/${item.imageLg}`}
                alt={item.imageLg}
            />
            <div className="card-body">
                <h1 className="card-favorite-title">{item.title}</h1>
                <div className="card-info">
                    <p><span className="season-nb">saison :{item.season}</span></p>
                    <p><span className="duration">durée :{item.duration}</span></p>
                    <p><span className="author">{item.author}</span></p>
                </div>
                <div className="card-synopsis">
                    <p>{item.synopsis}</p>
                </div>
                <div className="card-footer">
                </div>
            </div>
        </div>
    );

}

export default FavoriteCard;