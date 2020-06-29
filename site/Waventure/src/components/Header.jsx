import React, { useState, useEffect, useContext } from "react";
import "../style/Header.css";
import { Link, Redirect } from 'react-router-dom'
import { useRef } from "react";
import axios from "axios";
import Context from '../context/context'

export default function Header({
  categoriesTrigger,
  setCategoriesTrigger,
  accountTrigger,
  setAccountTriggerTrigger,
  titleArray,
  setTitleArray,
  handleSearchApp,
  toggle,
  setToggle,
}) {

  const { validate } = useContext(Context)
  const [search, setSearch] = useState('')
  const [resultSearch, setResultSearch] = useState([])
  const [userAvatar, setUserAvatar] = useState("");

  const refSearch = useRef(null)
  
  const pathImg = process.env.REACT_APP_STATIC_IMG_PATH;
  const pathAvar = process.env.REACT_APP_DYNAMIC_IMG_PATH;
  const serveurPath = process.env.REACT_APP_SERVER_PATH;

  const token = localStorage.getItem('token');

  const categories = () => {
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

  const fetchSearchSeries = async (e) => {
    let userSearch = refSearch.current.value
    const response = await fetch(`${serveurPath}/serie?search=%${userSearch}%`)
    const data = await response.json()
    setResultSearch(data)
  }

  /**
   * Fetch user avatar
   * @param token 
   */
  useEffect(() => {
    const fetchUserAvatar = async () => {
      var config = {
        method: 'get',
        url: `${serveurPath}/avatarByUser`,
        headers: {
          'x-access-token': token
        }
      };
      axios(config)
        .then(function (response) {
          setUserAvatar(response.data[0].avatar_path)
        })
        .catch(function (error) {
          console.log(error);
        });
    }
    fetchUserAvatar();
  }, [serveurPath, token, validate])


  const getInput = (e) => {
    if (e.target.value !== "") {
      setToggle(true)
    } else {
      setToggle(false)
    }
    setSearch(e.target.value)
    fetchSearchSeries(e)
  }

  const showSearch = (e) => {
    if (e.target.value !== "") {
      setToggle(true)
    }

  }

  const logout = () => {
    localStorage.clear('token');
    if (!localStorage.getItem('token')) {
      return <Redirect to="/home" />
    }
  }

  const handleSearch = (result) => {
    handleSearchApp(result)
  }

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
  );
}
