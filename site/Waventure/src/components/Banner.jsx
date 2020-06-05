import React, { useState, useEffect } from 'react'
import "../style/Banner.css";

export default function Banner() {
    const [wedette, setWedette] = useState({})
    const url = process.env.REACT_APP_DYNAMIC_IMG_PATH
    const fetchWedette = async () => {
        const reponse = await fetch(`http://localhost:4000/series/1`)
        const data = await reponse.json()
        setWedette(data[0].image)
    }

    useEffect(() => {
        fetchWedette()
    }, [])
    return (
        <div className="wedetteContainer">
            <div className="wedetteCover">
              <img className="wedetteCoverImage" src={`${url}/clydevanilla.jpg`} alt="" />  
              <img src="./img/btnPlay.svg" className="btnPlay" alt=""/>  
            </div>
            <div className="wedetteLogoContainer">
            <span><img src="./img/logoWedette.svg" alt="W"/></span>
            <h2 className="wedetteIndicator">edette</h2>
            </div>
            
            <div className="wedetteDescription">
                
                <h3 className="wedetteTitle">CLYDE VANILLA</h3>
                <p className="wedetteSynopsis">Le jeune garçon Clyde part en quête de la pierre du Destin à travers l’univers.
                Il rencontrera notamment le sergent Moustachios, fondateur de la guilde des chasseurs de trésors,
                et partiront ensemble à bord du vaisseau Brodog. Avec le professeur Auguste Archiford, la mécanicienne
                Diesel et la mystérieuse Catwood, ils devront faire face aux soldats Consortium menés par le général Holista,
                lui aussi à la recherche des Quatre Zartéfacts.
                </p>
            </div>

            <img className="backgroundImg" src="./img/clyde.svg" alt="" />


        </div>
    )
}

