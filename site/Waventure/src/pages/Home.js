import React from "react";
import { Link } from 'react-router-dom';
import "../style/Home.css";

function Home(props) {
    const pathLogo = process.env.REACT_APP_STATIC_IMG_PATH;
    const pathImg = process.env.REACT_APP_DYNAMIC_IMG_PATH
    return (
        <>
            <header>
                <div className="leftHeaderSide">
                    <div className="waventureLogo">
                        <a href="./">Logo Cliquable</a>
                        <img src={`${pathLogo}/waventureLogo.svg`} alt="Waventure Logo" />
                        <h1>WAVENTURE</h1>
                    </div>
                </div>
                <button className="btn-variant">
                    <Link className="btn-txt" to="/signUp">
                        S'inscrire
                </Link>
                </button>
                <button className="btn-base">
                    <Link className="btn-txt" to="/signIn">
                        S'identifier
              </Link>
                </button>
            </header>
            <main className="wrap">
                <div className="center-title">
                    <h1>Ecoutez vos sagas mp3 préférées,<br />
                    Décrouvez-en des nouvelles.</h1>
                    <h1><strong>Gratuitement</strong></h1>
                    <div className="wrap-img">
                        <img src={`${pathImg}/synapse.jpg`} alt="cover synapse"/>
                        <img src={`${pathImg}/eden.jpg`} alt="cover eden"/>
                        <img src={`${pathImg}/jencyoReva.jpg`} alt="cover jencyoReva"/>
                        <img src={`${pathImg}/leCacaoQuiTue.jpg`} alt="cover " />
                        <img src={`${pathImg}/leChasseur.jpg`} alt="cover leCacaoQuiTue"/>
                        <img src={`${pathImg}/ledocteurBonoboShow.jpg`} alt="cover ledocteurBonoboShow"/>
                        <img src={`${pathImg}/ledonjondenaheulbeuk.jpg`} alt="cover ledonjondenaheulbeuk"/>
                        <img src={`${pathImg}/leGuideGalactique.jpg`} alt="cover leGuideGalactique"/>
                        <img src={`${pathImg}/lesAventuriers.jpg`} alt="cover lesAventuriers"/>
                        <img src={`${pathImg}/leVaisseau.jpg`} alt="cover leVaisseau"/>
                        <img src={`${pathImg}/ozion.jpg`} alt="cover ozion"/>
                        <img src={`${pathImg}/poseidome.jpg`} alt="cover poseidome"/>
                        <img src={`${pathImg}/trimoria.jpg`} alt="cover trimoria"/>
                        <img src={`${pathImg}/survivaure.jpg`} alt="cover survivaure"/>
                        <img src={`${pathImg}/rda.jpg`} alt="cover rda"/>
                        <img src={`${pathImg}/clydevanilla.jpg`} alt="cover clydevanilla"/>
                    </div>
                </div>
            </main>
        </>
    );
}

export default Home;