import React, { useState, useEffect, useContext } from 'react'
import Card from '../components/Card'
import getData from "../utiles/getData"

export default function HeaderCategory({ categoryName }) {
    const [category, setCategory] = useState([])
    console.log(categoryName);
    
    useEffect(() => {
        getData("serieCategory", setCategory, categoryName)
    }, [])
    

    return (
        <>
            <h3 className="card-main-title">{categoryName}</h3>
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
