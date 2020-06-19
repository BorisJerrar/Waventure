import React, {useEffect, useState} from 'react'
import "../style/Player.css";

export default function PlayerMoreInfo({serieId, toggleWrapper, sagaInfo}) {

    const [moreInfo, setMoreInfo] = useState([])
    const [author, setAuthor] = useState('')
    const [seriesByAuthor, setSeriesByAuthor]= useState([])

    
    useEffect(() => {
        const fetchSerieRole = async() =>{
            const response = await fetch (`http://localhost:4000/serieRole/${serieId}`)
            const data = await response.json() 
            setMoreInfo(data) 
            setAuthor(data[0] && data[0].author) 
        }
    
        const fetchSerieAuthor = async() => {
            const response = await fetch (`http://localhost:4000/serie?author=${author}`)
            const data = await response.json()
            let currentSerie = sagaInfo[0] && sagaInfo[0].serie_id
            let dataFilter = data.filter(item => item.serie_id !== currentSerie)
            setSeriesByAuthor(dataFilter)
        }
        fetchSerieRole()
        if(author){ 
            fetchSerieAuthor()
        }
       }, [serieId, author, sagaInfo])
       
    return (
        <div  style={toggleWrapper? {visibility: "visible"}: {visibility: "hidden"}} className="moreInfoWrapper">
            <h3>Auteur</h3>
            <p>{moreInfo.length !== 0 ? moreInfo[0].author : ""}</p>
            <h3>Distribution</h3>
            <div className="distributionWrapper">
               {moreInfo.map((item, index)=>{
                return(
                <p key={index} className="distributionCharacter"><span className="distributionActor">{item.name}</span>: {item.role.map((each, index)=>{
                    return(
                        <span key={index} className="distributionItem">{each}{index !== item.role.length-1? ", ":"."}</span>
                    )
                })}</p>    
                )
           })
        } 
            </div>
    <p className="otherSeries">{seriesByAuthor.length !== 0? "Par les créateurs de": ""     }
            {seriesByAuthor.map((item, index)=>{
                return(
                <span key={index}> {item.title}{index === seriesByAuthor.length-1? ".": ", "}</span>
                )
            })}
           </p> 
        </div>
    )
}
