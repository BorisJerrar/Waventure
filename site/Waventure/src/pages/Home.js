import React from "react";
import { Link } from 'react-router-dom';
import "../style/Home.css";

function Home(props) {
    const pathLogo = process.env.REACT_APP_STATIC_IMG_PATH;
    return (
        <main className="home">
            <header>
                <div className="leftHeaderSide">
                    <div className="waventureLogoLg">
                        <img src={`${pathLogo}/waventureLogoLg.svg`} alt="Waventure Logo" />
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
                    <h2>Ecoutez vos sagas mp3 préférées.<br />
                    Découvrez-en des nouvelles.</h2>
                    <h3><strong>Gratuitement</strong></h3>
               </div>
            </main>
        </main>
    );
}

export default Home;