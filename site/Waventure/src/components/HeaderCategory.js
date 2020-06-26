import React, { useState, useEffect } from 'react'
import Card from '../components/Card'

export default function HeaderCategory({ categoryName, lunchingEpisode }) {
    const [category, setCategory] = useState([])
    useEffect(() => {
        const fetchCategory = async () => {
            const response = await fetch(`http://localhost:4000/serieCategory/${categoryName}`)
            const data = await response.json()

            setCategory(data)
        }
        fetchCategory()
    }, [categoryName])
    const url = process.env.REACT_APP_DYNAMIC_IMG_PATH;
    const lunchingEpisodeCategorie = (item) => {
        lunchingEpisode(item.serie_id)
    }

    console.log(categoryName);
    return (
        <>
            <h3 className="newestTilte">{categoryName}</h3>
            <div className='newestCardContainer'>
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
                    />
                ))}
            </div>
        </>
    )
}
