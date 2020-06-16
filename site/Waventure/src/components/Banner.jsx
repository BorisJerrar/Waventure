import React, { useState, useEffect } from 'react'
import "../style/Banner.css";

export default function Banner({lunchingEpisode}) {

    const [wedette, setWedette] = useState([]);
    const [synopsis, setSynopsis] = useState([]);

    const url = process.env.REACT_APP_DYNAMIC_IMG_PATH
    const fetchWedette = async () => {
        const response = await fetch(`http://localhost:4000/serie/6`)
        const data = await response.json()
        setWedette(data[0])
    }
    const fetchSynopsis = async () => {
        const response = await fetch(`http://localhost:4000/synopsis?serie_id=6`)
        const data = await response.json()
        setSynopsis(data[0])
    }

    useEffect(() => {
        fetchWedette()
        fetchSynopsis()
    }, [])
    const lunchingEpisodeBanner = (serie) => {
    lunchingEpisode(serie.serie_id)
    }
    
    return (
        <div className={"wedetteContainer"}>
            <div className="wedetteCover" onClick={()=> lunchingEpisodeBanner(wedette)}>
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
            <img className="backgroundImg" src={`${url}/${wedette && wedette.image_bg?wedette.image_bg:''}`} alt={`Bg_image ${wedette && wedette.title ?wedette.title:''}`} />
        </div>
    )
}

