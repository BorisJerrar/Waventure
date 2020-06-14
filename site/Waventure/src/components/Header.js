import React, { useState, useEffect } from "react";
import "../style/Header.css";
import { Link } from 'react-router-dom'

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
  };
  useEffect(() => {
    const fetching = async () =>{
      const data = await fetch(`${serveurPath}/category`);
      const json = await data.json();
      setTitleArray(json);
    }
      if(categoriesTrigger){
        fetching()
      }
  }, [categoriesTrigger, serveurPath])
  const avatar = async () => {
    setAccountTriggerTrigger(!accountTrigger);
  };
  return (
    <header>
      <div className="leftHeaderSide">
        <div className="waventureLogo">
          <Link to="/main" className="LinkHome">Logo Cliquable</Link>
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
                              ? { padding: "8px", display: "flex" }
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
            <li><Link to='/newest' className='newestLink'>Nouveautés</Link></li>
            <li>Coup de coeur</li>
          </ul>
        </nav>
      </div>
      <div className="profilIcon" onClick={avatar}>
        <img src={`${pathImg}/arrow.svg`} alt="Arrow Icon" />
        <div className="avatarBox">
          <img src={`${pathAvar}/Avatar01.jpg`} alt="Profil Icon"/>
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
