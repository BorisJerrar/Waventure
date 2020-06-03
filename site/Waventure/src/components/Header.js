import React from "react";
import "../style/Header.css";

export default function Header() {
  const pathImg = process.env.REACT_APP_STATIC_IMG_PATH;
  return (
    <header>
      <div className="leftHeaderSide">
        <div className="waventureLogo">
          <img src={`${pathImg}/waventureLogo.svg`} alt="Waventure Logo"/>
          <h1>WAVENTURE</h1>
        </div>
        <div className="searchingBar">
          <input placeholder="Action" />
          <button>
            <img src={`${pathImg}/loupe.svg`} alt="Searching Logo" />
          </button>
        </div>
        <nav>
          <ul>
            <li>
              Categories
              <i>
                <img src={`${pathImg}/arrow.svg`} alt="Arrow Icon" className='arrowCategories'/>
              </i>
            </li>
            <li>Nouveautés</li>
            <li>Coup de coeur</li>
          </ul>
        </nav>
      </div>
      <div className="profilIcon">
        <img src={`${pathImg}/arrow.svg`} alt="Arrow Icon" />
        <img src={`${pathImg}/profilPic1.jpg`} alt="Profil Icon" />
      </div>
    </header>
  );
}
