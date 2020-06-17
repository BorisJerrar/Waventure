import React, {useState, useEffect} from 'react'
import '../style/Newest.css'

export default function HeaderCategory({categoryName, lunchingEpisode}) {
const [category, setCategory] = useState([])
    useEffect(() => {
        const fetchCategory = async() =>{
            const response = await fetch (`http://localhost:4000/serieCategory/${categoryName}`)
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
       {category.map((item, index) => {
           return (
                <div key={index} className='newestCard' onClick={()=> lunchingEpisodeCategorie(item)}>
                     <img
                className="newestCover"
                src={`${url}/${item.image_lg}`}
                alt={item.image_lg}
                />
                                    <div className='newestCardText'>
                    <h5>{item.title}</h5>
                    <p>{item.body}</p>
                    </div>
                </div>
                );
            })}
            </div>
            </>
    )
}
