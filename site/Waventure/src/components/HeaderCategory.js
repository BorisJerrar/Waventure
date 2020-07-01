import React, { useState, useEffect} from 'react'
import Card from '../components/Card'
import getData from "../utiles/getData"

export default function HeaderCategory({ categoryName, lunchingEpisode}) {
    const [category, setCategory] = useState([])
    useEffect(() => {
        getData("serieCategory", setCategory, `/${categoryName}`)
    }, [categoryName])
    

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
