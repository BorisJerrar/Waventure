import React from 'react'
import {Link} from 'react-router-dom'

export default function HeaderContent({refSearch,
    showSearch,
    getInput,
    search,
    handleSearch,
    toggle,
    resultSearch,
    categories,
    categoriesTrigger,
    titleArray,
    avatar,
    userAvatar,
    accountTrigger,
    logout}) {
    const pathImg = process.env.REACT_APP_STATIC_IMG_PATH;
    const pathAvar = process.env.REACT_APP_DYNAMIC_IMG_PATH;
    return (
        <header>
        <div className="leftHeaderSide">
          <div className="waventureLogoHeader">
            <Link to="/main" className="LinkHome">Logo Cliquable</Link>
            <img src={`${pathImg}/waventureLogo.svg`} alt="Waventure Logo" />
            <h1>WAVENTURE</h1>
          </div>
          <div className="searchingBar">
            <input ref={refSearch} onClick={showSearch} placeholder="Recherche" onChange={getInput} value={search} />
            <Link onClick={() => handleSearch(search)} to="/search" className="buttonSearch">
              <button>
                <img src={`${pathImg}/loupe.svg`} alt="Searching Logo" />
              </button>
            </Link>
  
            <div className="searchFetch" style={toggle ? { display: "block" } : { display: "none" }}>
  
              {resultSearch.map((each, key) => {
                return (
                  <Link onClick={() => handleSearch(each.lower)} key={key} to="/search" style={{ textDecoration: "none", color: "white" }}>
                    <div className="eachSearch">
                      <img className="eachImage" src={`${pathAvar}/${each.image}`} alt="" />
                      <p className="eachTitle">{each.lower}</p>
                    </div>
                  </Link>
  
                )
              })}
  
            </div>
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
                        <Link to={`/${each.name}`}
                          key={key}
                          className="categoriesParagraph"
                          style={
                            categoriesTrigger
                              ? { opacity: 1, padding: "8px", visibility: "visible" }
                              : { visibility: "hidden", opacity: 0 }
                          }
                        >
                          {each.name}
                        </Link>
                      );
                    })
                    : ""}
                </div>
              </li>
              <li><Link to='/newest' className='newestLink'>Nouveautés</Link></li>
              <li><Link to='/favorite' className='newestLink'>Coup de coeur</Link></li>
            </ul>
          </nav>
        </div>
        <div className="profilIcon" onClick={avatar}>
          <img className="firstArrow" src={`${pathImg}/arrow.svg`} alt="Arrow Icon" />
          <div className="avatarBox">
            <img src={`${pathAvar}/${userAvatar}`} alt="Profil Icon" />
            {accountTrigger ? (
              <div className="accountRolling">
                <Link to="/profil" className="categoriesParagraph">
                  <p
                    className="categoriesParagraph"
                    style={{ padding: "8px", display: "block" }}
                  >
                    Profil
              </p>
                </Link>
                <Link to="/contact" className="categoriesParagraph">
                  <p
                    className="categoriesParagraph"
                    style={{ padding: "8px", display: "block" }}
                  >
                    Contacter Waventure
              </p>
                </Link>
                <p
                  className="categoriesParagraph"
                  style={{ padding: "8px", display: "block" }}
                  onClick={logout}
                >
                  Se déconnecter
                </p>
              </div>
            ) : (
                ""
              )}
          </div>
        </div>
      </header>
    )
}