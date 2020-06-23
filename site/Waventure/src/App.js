import React, { useState } from "react";
import "./App.css";
import Header from "./components/Header.jsx";
import Player from "./components/Player";
import Catalog from "./components/Catalog";
import Banner from "./components/Banner";
import Newest from "./components/Newest";
import HeaderCategory from "./components/HeaderCategory";
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import Search from "./components/Search.jsx";
import Contact from "./components/Contact.jsx";
import Profil from "./components/Profil.jsx";

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
  const [uniqueSearch, setUniqueSearch] = useState({})
  const [toggle, setToggle] = useState(false)
  const [titleArray, setTitleArray] = useState([]);

  console.log(localStorage.getItem('token'))

 const receving = () => {
   setPlaying(false)
   setShowingPlayer(false)
   setSerieId(-1)
   setReducer(false)
 }
  const handleSearchApp = (result)=>{
      setUniqueSearch(result)
  }

  const triggeringCategory = () => {
    if (categoriesTrigger) {
      setCategoriesTrigger(!categoriesTrigger);
    } else if (accountTrigger) {
      setAccountTriggerTrigger(!accountTrigger);
    } else if (toggleWrapper) {
      setToggleWrapper(!toggleWrapper);
    }

    if(toggle){
      setToggle(false)
    }

  };
  const lunchingEpisode = (serie_id) => {
    setPlaying(true);
    setShowingPlayer(true);
    setIndex(0);
    setSerieId(serie_id);
  };

  if (!localStorage.getItem('token')) {
    return <Redirect to="/home" />
  }
  return (
    <Router>
      <div className="App" onClick={triggeringCategory}>
        <>
          <Header
            categoriesTrigger={categoriesTrigger}
            setCategoriesTrigger={setCategoriesTrigger}
            accountTrigger={accountTrigger}
            setAccountTriggerTrigger={setAccountTriggerTrigger}
            titleArray={titleArray}
            setTitleArray={setTitleArray}
            handleSearchApp={(result)=>handleSearchApp(result)}
            toggle={toggle}
            setToggle={setToggle}
          />
          <div
            className={playing?"playerTrigger fixing":"playerTrigger"}
            style={
              showingPlayer || reducer
                ? {
                  zIndex: 200000,
                    transform: "matrix(1, 0, 0, 1, 0, 0)",
                    opacity: 1
                  }
                : {
                  zIndex: -1,
                    transform: "matrix(1, 0, 0, 1, 0, -270)",
                    opacity: 0
                  }
            }
          >
              <Player
                serieId={serieId}
                index={index}
                setIndex={setIndex}
                reducer={reducer}
                setReducer={setReducer}
                playing={playing}
                toggleWrapper={toggleWrapper}
                setToggleWrapper={setToggleWrapper}
                setSagaEpisodeSaisonInfo={setSagaEpisodeSaisonInfo}
                sagaEpisodeSaisonInfo={sagaEpisodeSaisonInfo}
                sending={()=>{receving()}}
              />
          </div>
          <Switch>
            <Route path='/profil'>
              <Profil/>
            </Route>
            <Route path='/contact'>
              <Contact/>
            </Route>

            <Route path="/search">
              <Search
              uniqueSearch={uniqueSearch}
              lunchingEpisode={lunchingEpisode}
              />
            </Route>
            <Route path="/newest">
              <div
                className="playerTrigger"
                style={
                  showingPlayer || reducer
                    ? {
                        transform: "matrix(1, 0, 0, 1, 0, 0)",
                      }
                    : {
                        transform: "matrix(1, 0, 0, 1, 0, -270)",
                      }
                }
              >
                <Newest
                  lunchingEpisode={(serie_id) => lunchingEpisode(serie_id)}
                />
              </div>
            </Route>
            <Route path="/main">
              <div
                className="playerTrigger improve"
                style={
                  showingPlayer || reducer
                    ? {
                        transform: "matrix(1, 0, 0, 1, 0, 0)",
                      }
                    : {
                        transform: "matrix(1, 0, 0, 1, 0, -270)",
                      }
                }
              >
                <Banner
                  lunchingEpisode={(serie_id) => lunchingEpisode(serie_id)}
                />
              </div>
              <div
                className={"playerTrigger catalogApp"}
                style={
                  showingPlayer || reducer
                    ? {
                        transform: "matrix(1, 0, 0, 1, 0, 0)",
                      }
                    : {
                        transform: "matrix(1, 0, 0, 1, 0, -270)",
                      }
                }
              >
                <Catalog
                  lunchingEpisode={(serie_id) => lunchingEpisode(serie_id)}
                />
              </div>
            </Route>
            {titleArray.map((item, index) => {
              return (
                <Route path={`/${item.name}`} key={index}>
                  <div
                    className="playerTrigger flexing"
                    style={
                      showingPlayer || reducer
                        ? {
                            transform: "matrix(1, 0, 0, 1, 0, 0)",
                          }
                        : {
                            transform: "matrix(1, 0, 0, 1, 0, -270)",
                          }
                    }
                  >
                    <HeaderCategory
                      categoryName={item.name}
                      lunchingEpisode={(serie_id) => lunchingEpisode(serie_id)}
                    />
                  </div>
                </Route>
              );
            })}
          </Switch>
        </>
      </div>
    </Router>
  );
}

export default App;
