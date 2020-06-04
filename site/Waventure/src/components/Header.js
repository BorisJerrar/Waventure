import React, { useState } from "react";
import "../style/Header.css";

export default function Header({
  categoriesTrigger,
  setCategoriesTrigger,
  accountTrigger,
  setAccountTriggerTrigger,
}) {
  const [titleArray, setTitleArray] = useState([]);
  const pathImg = process.env.REACT_APP_STATIC_IMG_PATH;
  const pathAvar = process.env.REACT_APP_DYNAMIC_IMG_PATH;
  const serveurPath = process.env.REACT_APP_SERVER_PATH;
  const categories = async () => {
    setCategoriesTrigger(!categoriesTrigger);
    const data = await fetch(`${serveurPath}/categories`);
    const json = await data.json();
    setTitleArray(json);
  };
  const avatar = async () => {
    setAccountTriggerTrigger(!accountTrigger);
  };
  return (
    <header>
      <div className="leftHeaderSide">
        <div className="waventureLogo">
          <a href="./">Logo Cliquable</a>
          <img src={`${pathImg}/waventureLogo.svg`} alt="Waventure Logo" />
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
            <li className="category" onClick={categories}>
              Categories
              <i>
                <img
                  src={`${pathImg}/arrow.svg`}
                  alt="Arrow Icon"
                  className="arrowCategories"
                />
              </i>
              <div className="categoriesFetch">
                {categoriesTrigger
                  ? titleArray.map((each, key) => {
                      return (
                        <p
                          key={key}
                          className="categoriesParagraph"
                          style={
                            categoriesTrigger
                              ? { padding: "8px", display: "block" }
                              : { display: "none" }
                          }
                        >
                          {each.name}
                        </p>
                      );
                    })
                  : ""}
              </div>
            </li>
            <li>Nouveautés</li>
            <li>Coup de coeur</li>
          </ul>
        </nav>
      </div>
      <div className="profilIcon" onClick={avatar}>
        <img src={`${pathImg}/arrow.svg`} alt="Arrow Icon" />
        <div className="avatarBox">
          <img src={`${pathAvar}/Avatar01.jpg`} alt="Profil Icon" />
        {accountTrigger ? (
          <div className="accountRolling">
            <p
              className="categoriesParagraph"
              style={{ padding: "8px", display: "block" }}
            >
              Profil
            </p>
            <p
              className="categoriesParagraph"
              style={{ padding: "8px", display: "block" }}
            >
              Contacter Waventure
            </p>
            <p
              className="categoriesParagraph"
              style={{ padding: "8px", display: "block" }}
            >
              Se Deconecter
            </p>
          </div>
        ) : (
          ""
        )}
         </div>
      </div>
    </header>
  );
}
