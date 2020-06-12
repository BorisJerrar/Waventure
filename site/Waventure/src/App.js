import React, { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import Player from "./components/Player";
import Catalog from "./components/Catalog";
import Banner from "./components/Banner";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import {
  BrowserRouter as Router,
  Route,
} from "react-router-dom";


function App() {
  const [categoriesTrigger, setCategoriesTrigger] = useState(false);
  const [accountTrigger, setAccountTriggerTrigger] = useState(false);
  const [reducer, setReducer] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [showingPlayer, setShowingPlayer] = useState(false);
  const [serieId, setSerieId] = useState(2);
  const [index, setIndex] = useState(0);
  const triggeringCategory = () => {
    if (categoriesTrigger) {
      setCategoriesTrigger(!categoriesTrigger);
    } else if (accountTrigger) {
      setAccountTriggerTrigger(!accountTrigger);
    }
  };
  const lunchingEpisode = (serie_id) => {
    setPlaying(true)
    setShowingPlayer(true);
    setIndex(0);
    setSerieId(serie_id);
  };
  return (
    <Router>

      <Route path="/home">
        <Home />
      </Route>

      <Route path="/signUp">
        <SignUp />
      </Route>

      <Route path="/signIn">
        <SignIn />
      </Route>

      <Route path="/main">
      <div className="App" onClick={triggeringCategory}>
        <>
          <Header
            categoriesTrigger={categoriesTrigger}
            setCategoriesTrigger={setCategoriesTrigger}
            accountTrigger={accountTrigger}
            setAccountTriggerTrigger={setAccountTriggerTrigger}
            />
          <div className='playerTrigger' style={showingPlayer || reducer ? { marginTop: '0px',  zIndex: 1000, transition: 'all .2s ease' } : { marginTop: '-270px', zIndex: -0,transition: 'all .2s ease' }}>
            <Player serieId={serieId} index={index} setIndex={setIndex} reducer={reducer} setReducer={setReducer} playing={playing} />
          </div>
         <Banner lunchingEpisode={(serie_id) => lunchingEpisode(serie_id)} />
          <Catalog lunchingEpisode={(serie_id) => lunchingEpisode(serie_id)} />
        </>
      </div>
      </Route>
    </Router>
  );
}

export default App;
