import React, { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import Player from "./components/Player";
import Catalog from "./components/Catalog";
import Banner from "./components/Banner";
import Newest from "./components/Newest";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  const [categoriesTrigger, setCategoriesTrigger] = useState(false);
  const [accountTrigger, setAccountTriggerTrigger] = useState(false);
  const [reducer, setReducer] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [showingPlayer, setShowingPlayer] = useState(false);
  const [serieId, setSerieId] = useState(2);
  const [index, setIndex] = useState(0);
  const [offset, setOffset] = useState(0);

  window.addEventListener("scroll", () => {
    setTimeout(() => {
      setCategoriesTrigger(false);
      setAccountTriggerTrigger(false);
    }, 500);
    setOffset(window.scrollY);
  });

  const triggeringCategory = () => {
    if (categoriesTrigger) {
      setCategoriesTrigger(!categoriesTrigger);
    } else if (accountTrigger) {
      setAccountTriggerTrigger(!accountTrigger);
    }
  };
  const lunchingEpisode = (serie_id) => {
    setPlaying(true);
    setShowingPlayer(true);
    setIndex(0);
    setSerieId(serie_id);
  };
  return (
    <Router>
      <div className="App" onClick={triggeringCategory}>
        <>
          <Header
            categoriesTrigger={categoriesTrigger}
            setCategoriesTrigger={setCategoriesTrigger}
            accountTrigger={accountTrigger}
            setAccountTriggerTrigger={setAccountTriggerTrigger}
          />
          <div
            className={
              offset >= 75 && showingPlayer
                ? "playerTrigger fix"
                : "playerTrigger"
            }
            style={
              showingPlayer || reducer
                ? {
                    marginTop: "0px",
                    zIndex: "90",
                    transition: "all .2s ease",
                  }
                : {
                    marginTop: "-270px",
                    zIndex: -0,
                    transition: "all .2s ease",
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
              offset={offset}
            /> 
          </div>
          <Switch>
          <Route path="/newest">
            <Newest lunchingEpisode={(serie_id) => lunchingEpisode(serie_id)} />
          </Route>
          <Route path="/main">
            <Banner lunchingEpisode={(serie_id) => lunchingEpisode(serie_id)} />
            <Catalog
              lunchingEpisode={(serie_id) => lunchingEpisode(serie_id)}
              />
          </Route>
              </Switch>
        </>
      </div>
    </Router>
  );
}

export default App;
