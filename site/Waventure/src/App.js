
import React, { useState, useRef, useEffect} from "react";
import "./App.css";
import Header from "./components/Header.jsx";
import Player from "./components/Player";
import Catalog from "./components/Catalog";
import Banner from "./components/Banner";
import Newest from "./components/Newest";
import Context from "./context/context"
import Categories from "./components/Categories";
import Favorite from "./components/Favorite";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import Search from "./components/Search.jsx";
import Contact from "./components/Contact.jsx";
import Profil from "./components/Profil.jsx";
import UpdateProfil from "./components/UpdateProfil.jsx";
import UpdatePassword from "./components/UpdatePassword.jsx";
import getDataToken from './utiles/getDataWithToken'

function App() {

  const [categoriesTrigger, setCategoriesTrigger] = useState(false);
  const [accountTrigger, setAccountTriggerTrigger] = useState(false);
  const [reducer, setReducer] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [showingPlayer, setShowingPlayer] = useState(false);
  const [serieId, setSerieId] = useState(-1);
  const [index, setIndex] = useState(0);
  const [toggleWrapper, setToggleWrapper] = useState(false);
  const [sagaEpisodeSaisonInfo, setSagaEpisodeSaisonInfo] = useState([]);
  const [uniqueSearch, setUniqueSearch] = useState({});
  const [toggle, setToggle] = useState(false);
  const [user, setUser] = useState([])
  const [synopsis, setSynopsis] = useState(false);
  const [episodes, setEpisodes] = useState(false);
  const [learnMore, setLearnMore] = useState(false);
  const [matches, setMaches] = useState(window.innerWidth);
  const [categories, setCategories] = useState([]);
  const [favoriteInfo, setFavoriteInfo] = useState([]);
  const playerRef = useRef();
  const token = localStorage.getItem("token");
  const serverPath = process.env.REACT_APP_SERVER_PATH;
  const imagePath = process.env.REACT_APP_STATIC_IMG_PATH;
  
  const receving = () => {
    setLearnMore(false);
    setEpisodes(false);
    setSynopsis(false);
    setPlaying(false);
    setShowingPlayer(false);
    setSerieId(-1);
  };
  const recevingReducer = () => {
    setLearnMore(false);
    setEpisodes(false);
    setSynopsis(false);
    setReducer(!reducer);
  };
  const handleSearchApp = (result) => {
    setUniqueSearch(result);
  };


  

  useEffect(()=>{
    getDataToken('account', setUser, '')
 },[])

  const triggeringCategory = () => {
    if (categoriesTrigger) {
      setCategoriesTrigger(!categoriesTrigger);
    } else if (accountTrigger) {
      setAccountTriggerTrigger(!accountTrigger);
    } else if (toggleWrapper) {
      setToggleWrapper(!toggleWrapper);
    }

    if (toggle) {
      setToggle(false);
    }
  };
  const lunchingEpisode = (serie_id, episode) => {
    playerRef.current.audio.current.pause();
    setPlaying(true);
    setShowingPlayer(true);
    setIndex(episode);
    setSerieId(serie_id);
  };

  if (!localStorage.getItem("token")) {
    return <Redirect to="/home" />;
  }

  const context = {
    categoriesTrigger,
    accountTrigger,
    reducer,
    playing,
    showingPlayer,
    serieId,
    index,
    toggleWrapper,
    sagaEpisodeSaisonInfo,
    uniqueSearch,
    toggle,
    user,
    synopsis,
    episodes,
    learnMore,
    matches,
    categories,
    token,
    serverPath,
    imagePath,
    favoriteInfo,
    setCategoriesTrigger,
    setAccountTriggerTrigger,
    setReducer,
    setPlaying,
    setShowingPlayer,
    setSerieId,
    setIndex,
    setToggleWrapper,
    setSagaEpisodeSaisonInfo,
    setUniqueSearch,
    setToggle,
    setUser,
    setSynopsis,
    setEpisodes,
    setLearnMore,
    setMaches, 
    setCategories,
    setFavoriteInfo,
  }

  return (
    
    <Context.Provider value={context}>
    <Router>
      <div className="App" onClick={triggeringCategory}>
        <>
          <Header
            handleSearchApp={(result) => handleSearchApp(result)}
          />
          <div
            className={
              reducer ? "playerTriggerNoAnnim" : "playerTrigger fixing"
            }
            style={
              showingPlayer && !reducer
                ? {
                    zIndex: 200000,
                    transform: "matrix(1, 0, 0, 1, 0, 0)",
                    opacity: 1,
                  }
                : showingPlayer && reducer
                ? {
                    zIndex: 200000,
                    position: "fixed",
                    bottom: "40px",
                    right: "40px",
                    width: "360px",
                  }
                : reducer && !showingPlayer
                ? {
                    zIndex: -1,
                    position: "fixed",
                    bottom: "40px",
                    right: "-25vw",
                    width: "360px",
                    opacity: 0,
                  }
                : {
                    zIndex: -1,
                    transform: "matrix(1, 0, 0, 1, 0, -270)",
                    height: 0,
                    opacity: 0,
                  }
            }
          >
            <Player
              sending={() => {
                receving();
              }}
              sendingReducer={() => {
                recevingReducer();
              }}
              playerRef={playerRef}
            />
          </div>
          <Switch>
            <Route path='/passwordUpdate'>
              <UpdatePassword
              user={user}
              />
            </Route>
            <Route path='/profil'>
              <Profil
                user={user}
                setUser={setUser}
              />
            </Route>
            <Route path="/profilUpdate">
                <UpdateProfil/>
            </Route>
            <Route path='/contact'>
              <Contact/>
            </Route>

            <Route path="/search">
              <Search
                uniqueSearch={uniqueSearch}
                lunchingEpisode={(serie_id, episode) => lunchingEpisode(serie_id, episode)}
              />
            </Route>
            <Route path="/newest">
              <div className="playerTrigger"
            >
                <Newest
                  lunchingEpisode={(serie_id, episode) => lunchingEpisode(serie_id, episode)}
                />
              </div>
            </Route>
            <Route path="/favorite">
              <div
                className="playerTrigger"
              >
                <Favorite 
                            lunchingEpisode={(serie_id, episode) => lunchingEpisode(serie_id, episode)}
                />
              </div>
            </Route>
            <Route path="/main">
              <div
                className="playerTrigger" /* style={reducer && showingPlayer?{marginTop:"0px"}: showingPlayer?{marginTop:"0px"}:reducer && showingPlayer === false?{marginTop:"-100px"}:{marginTop:"-270px"}} */
              >
                <Banner
                  lunchingEpisode={(serie_id, episode) => lunchingEpisode(serie_id, episode)}
                />
              </div>
              <div className={"playerTrigger catalogApp"}>
                <Catalog
                  lunchingEpisode={(serie_id, episode) =>
                    lunchingEpisode(serie_id, episode)
                  }
                  matches={matches}
                  setMaches={setMaches}
                />
              </div>
            </Route>
            {categories.map((item, index) => {
              return (
                <Route path={`/${item.name}`} key={index}>
                  <div className="playerTrigger flexing">
                    <Categories
                      categoryName={item.name}
                      lunchingEpisode={(serie_id, episode) => lunchingEpisode(serie_id, episode)}
                    />
                  </div>
                </Route>
              );
            })}
          </Switch>
        </>
      </div>
    </Router>
    </Context.Provider>
  );
}

export default App;
