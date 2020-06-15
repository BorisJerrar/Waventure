import React, { useState, useEffect } from 'react'
import '../style/Newest.css'
export default function Newest({lunchingEpisode}) {
    const [newest, setNewest] = useState([])
    const fetchNewest = async() =>{
        const response = await fetch (`http://localhost:4000/serieUploades`)
        const data = await response.json()
        
        setNewest(data)
    }
    useEffect(() => {
     fetchNewest()
    }, [])
    const url = process.env.REACT_APP_DYNAMIC_IMG_PATH;
    console.log(newest);
    const lunchingEpisodeCategorie = (item) => {
        lunchingEpisode(item.serie_id)
    }
    return (
        <div className='newestCardContainer'>
<h3>Nouveautées</h3>
       {newest.map((item, index) => {
            return (
                <div>
                    <h5>{item.title}</h5>
                    <p>{item.body}</p>
                <img
                key={index}
                onClick={()=> lunchingEpisodeCategorie(item)}
                className="newestCover"
                src={`${url}/${item.image_lg}`}
                alt={item.image_lg}
                />
                </div>
                );
            })}
            </div>
    )
}
