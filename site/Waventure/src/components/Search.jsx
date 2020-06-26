import React, {useEffect, useState} from 'react'
import "../style/search.css";

export default function Search({uniqueSearch, lunchingEpisode }) {
const serverPath = process.env.REACT_APP_SERVER_PATH;
const urlimg = process.env.REACT_APP_DYNAMIC_IMG_PATH;
const [uniqueSerie, setUniqueSerie] = useState([])

useEffect(() => {
    const fetchUniqueSerie = async() =>{
        const response = await fetch (`${serverPath}/serieSynopsis?search=%${uniqueSearch}%`)
        const data = await response.json()
        setUniqueSerie(data)
    }

    fetchUniqueSerie()
}, [uniqueSearch, serverPath])




    return (
        <div className="bodySearch">
            {uniqueSerie.map((each, key)=>{
                return(
                   <div onClick={()=>lunchingEpisode(each.serie_id)} className="uniqueCard" key={key}>
            <img src={`${urlimg}/${each.image}`} alt=""/>
            <div>
                <h5>{each.title}</h5>
                <p>{each.body}</p>
            </div>
            </div> 
                )
            
            })}
           
            
        
        </div>
        
        
    )
}
