import React, { useState, useEffect, useContext} from 'react'
import Card from './Card'
import getData from "../utiles/getData"
import Context from "../context/context";

export default function Categories({ categoryName, lunchingEpisode}) {
    const [category, setCategory] = useState([])
    const {favoriteInfo} = useContext(Context)
    useEffect(() => {
        getData("serieCategory", setCategory, `/${categoryName}`)
    }, [categoryName, favoriteInfo])
    

    return (
        <>
        <div className="tab-content">
            <h3 className="card-main-title">{categoryName}</h3>
                {category.map((item, index) => (
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
        </>
    )
}
