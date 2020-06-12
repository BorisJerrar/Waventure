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
                        <img src={`${pathImg}/synapse.jpg`}></img>
                        <img src={`${pathImg}/eden.jpg`}></img>
                        <img src={`${pathImg}/jencyoReva.jpg`}></img>
                        <img src={`${pathImg}/leCacaoQuiTue.jpg`}></img>
                        <img src={`${pathImg}/leChasseur.jpg`}></img>
                        <img src={`${pathImg}/ledocteurBonoboShow.jpg`}></img>
                        <img src={`${pathImg}/ledonjondenaheulbeuk.jpg`}></img>
                        <img src={`${pathImg}/leGuideGalactique.jpg`}></img>
                        <img src={`${pathImg}/lesAventuriers.jpg`}></img>
                        <img src={`${pathImg}/leVaisseau.jpg`}></img>
                        <img src={`${pathImg}/ozion.jpg`}></img>
                        <img src={`${pathImg}/poseidome.jpg`}></img>
                        <img src={`${pathImg}/trimoria.jpg`}></img>
                        <img src={`${pathImg}/survivaure.jpg`}></img>
                        <img src={`${pathImg}/rda.jpg`}></img>
                        <img src={`${pathImg}/clydevanilla.jpg`}></img>
                    </div>
                </div>
            </main>
        </>
    );
}

export default Home;