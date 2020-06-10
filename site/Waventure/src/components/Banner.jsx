import React, { useState, useEffect } from 'react'
import "../style/Banner.css";

export default function Banner(props) {

    const [wedette, setWedette] = useState([]);
    const [synopsis, setSynopsis] = useState([]);

    const url = process.env.REACT_APP_DYNAMIC_IMG_PATH
    const fetchWedette = async () => {
        const response = await fetch(`http://localhost:4000/serie/1`)
        const data = await response.json()
        setWedette(data[0])
    }
    const fetchSynopsis = async () => {
        const response = await fetch(`http://localhost:4000/synopsis?serie_id=1`)
        const data = await response.json()
        setSynopsis(data[0])
    }

    useEffect(() => {
        fetchWedette()
        fetchSynopsis()
    }, [])
    const lunchingEpisode = (serie) => {
    props.lunchingEpisode(serie.serie_id)
    }
    
    return (
        <div className="wedetteContainer">
            <div className="wedetteCover" onClick={()=> lunchingEpisode(wedette)}>
              <img className="wedetteCoverImage" src={`${url}/${wedette && wedette.image_lg ? wedette.image_lg : '' }`} alt="" />  
              <img src="./img/btnPlay.svg" className="btnPlay" alt=""/>  
            </div>
            <div className="wedetteLogoContainer">
            <span><img src="./img/logoWedette.svg" alt="W"/></span>
            <h2 className="wedetteIndicator">edette</h2>
            </div>
            
            <div className="wedetteDescription">
                
                <h3 className="wedetteTitle">{wedette.title}</h3>
                <p className="wedetteSynopsis">
                    {synopsis.body}
                </p>
            </div>
            <img className="backgroundImg" src="./img/clyde.svg" alt="" />
        </div>
    )
}

