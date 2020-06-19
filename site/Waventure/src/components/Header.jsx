import React, { useState, useEffect } from "react";
import "../style/Header.css";
import { Link, Redirect } from 'react-router-dom'

export default function Header({
  categoriesTrigger,
  setCategoriesTrigger,
  accountTrigger,
  setAccountTriggerTrigger,
  titleArray,
  setTitleArray
}) {

  const [search, setSearch] = useState('')
  const [toggle, setToggle] = useState(false)
  const [resultSearch, setResultSearch] = useState([])
  const pathImg = process.env.REACT_APP_STATIC_IMG_PATH;
  const pathAvar = process.env.REACT_APP_DYNAMIC_IMG_PATH;
  const serveurPath = process.env.REACT_APP_SERVER_PATH;

  const categories = async () => {
    setCategoriesTrigger(!categoriesTrigger);
  };

  useEffect(() => {
    const fetching = async () => {
      const data = await fetch(`${serveurPath}/category`);
      const json = await data.json();
      setTitleArray(json);
    }
    if (categoriesTrigger) {
      fetching()
    }
  }, [categoriesTrigger, serveurPath, setTitleArray])

  const avatar = async () => {
    setAccountTriggerTrigger(!accountTrigger);
  };

  const fetchSearchSeries = async(e) =>{
    let userSearch = e.target.value.toLowerCase()
    const response = await fetch (`${serveurPath}/serie?search=%${userSearch}%`)
    const data = await response.json() 
    setResultSearch(data)
}

  const getInput = (e) => {
    if(e.target.value !== "" ){
      setToggle(true)
    }else{
      setToggle(false)
    }
    setSearch(e.target.value)  
    fetchSearchSeries(e)  
  }  

  const hideSearch = () => {
    setToggle(false)
  }

  const showSearch = (e) => {
    if(e.target.value !== ""){
      setToggle(true)
    }
    
  }

  const logout = () => {
    localStorage.clear('token');
    console.log(localStorage.getItem('token'));
    if (!localStorage.getItem('token')) {
      console.log('déconnexion')
      return <Redirect to="/home"/>
    }
  }
  
  return (
    <header>
      <div className="leftHeaderSide">
        <div className="waventureLogoHeader">
          <Link to="/main" className="LinkHome">Logo Cliquable</Link>
          <img src={`${pathImg}/waventureLogo.svg`} alt="Waventure Logo"/>
          <h1>WAVENTURE</h1>
        </div>
        <div onBlur={hideSearch} className="searchingBar">
          <input onFocus={showSearch} placeholder="Recherche" onChange={getInput} value={search} />
          <button>
            <img src={`${pathImg}/loupe.svg`} alt="Searching Logo" />
          </button>
          <div className="searchFetch" style={toggle ? {display:"block"} : {display:"none"}}>
            
               {resultSearch.map((each, key) =>{
                 return(
                   <div className="eachSearch" key={key}>
                   <img className="eachImage" src={`${pathAvar}/${each.image}`} alt=""/>
                   <p className="eachTitle">{each.lower}</p>
                   </div>
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
                            ? { padding: "8px", display: "flex" }
                            : { display: "none" }
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
  );
}
