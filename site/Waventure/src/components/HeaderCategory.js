import React, { useState, useEffect, useContext } from 'react'
import Card from '../components/Card'
import getData from "../utiles/getData"

export default function HeaderCategory({ categoryName }) {
    const [category, setCategory] = useState([])
    console.log(categoryName);
    
    useEffect(() => {
<<<<<<< HEAD
        const fetchCategory = async () => {
            const response = await fetch(`${serverPath}/serieCategory/${categoryName}`)
            const data = await response.json()

            setCategory(data)
        }
        fetchCategory()
    }, [categoryName, serverPath])
=======
        getData("serieCategory", setCategory, categoryName)
    }, [])
>>>>>>> b60d3fe30ead9925c3281a4622bbbb79bb243a97
    

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
