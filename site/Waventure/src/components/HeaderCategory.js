import React, { useState, useEffect } from 'react'
import Card from '../components/Card'

export default function HeaderCategory({ categoryName }) {
    const [category, setCategory] = useState([])
    useEffect(() => {
        const fetchCategory = async () => {
            const response = await fetch(`http://localhost:4000/serieCategory/${categoryName}`)
            const data = await response.json()

            setCategory(data)
        }
        fetchCategory()
    }, [categoryName])
    

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
