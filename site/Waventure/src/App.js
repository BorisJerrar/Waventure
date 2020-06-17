import React, { useState } from "react";
import "./App.css";
import Header from "./components/Header.jsx";
import Player from "./components/Player";
import Catalog from "./components/Catalog";
import Banner from "./components/Banner";
import Newest from "./components/Newest";
import HeaderCategory from "./components/HeaderCategory";
import Sticky from "react-stickynode";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  const [categoriesTrigger, setCategoriesTrigger] = useState(false);
  const [accountTrigger, setAccountTriggerTrigger] = useState(false);
  const [reducer, setReducer] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [showingPlayer, setShowingPlayer] = useState(false);
  const [serieId, setSerieId] = useState(-1);
  const [index, setIndex] = useState(0);
  const [toggleWrapper, setToggleWrapper] = useState(false)

 
  const [titleArray, setTitleArray] = useState([]);

  const triggeringCategory = () => {
    
    if (categoriesTrigger) {
      setCategoriesTrigger(!categoriesTrigger);
    } else if (accountTrigger) {
      setAccountTriggerTrigger(!accountTrigger);
    } else if(toggleWrapper){
      setToggleWrapper(!toggleWrapper)
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
            titleArray={titleArray}
            setTitleArray={setTitleArray}
          />
          <div
            className="playerTrigger"
            style={
              showingPlayer || reducer
                ? {
                    zIndex: "90",
                    transition: "all .2s ease",
                  }
                : {
                    zIndex: -1,
                    transition: "all .2s ease",
                  }
            }
          >
          <Sticky enabled={showingPlayer?true:false} top={0}>
          <Player    
              serieId={serieId}
              index={index}
              setIndex={setIndex}
              reducer={reducer}
              setReducer={setReducer}
              playing={playing}
              toggleWrapper={toggleWrapper}
              setToggleWrapper={setToggleWrapper}
              />
</Sticky>
          </div>
          <Switch>
            <Route path="/newest">
              <div
                className="playerTrigger"
                style={
                  showingPlayer || reducer
                    ? {
                        marginTop: 0,
                        transition: "all .2s ease",
                      }
                    : {
                        marginTop: "-270px",
                        transition: "all .2s ease",
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
                className="playerTrigger"
                style={
                  showingPlayer || reducer
                    ? {
                        marginTop: 0,
                        transition: "all .2s ease",
                      }
                    : {
                        marginTop: "-270px",
                        transition: "all .2s ease",
                      }
                }
              >
                <Banner
                  lunchingEpisode={(serie_id) => lunchingEpisode(serie_id)}
                />
              </div>
              <Catalog
                lunchingEpisode={(serie_id) => lunchingEpisode(serie_id)}
              />
            </Route>
            {titleArray.map((item, index) => {
              return (
                <Route path={`/${item.name}`} key={index}>
                  <div
                    className="playerTrigger flexing"
                    style={
                      showingPlayer || reducer
                        ? {
                            marginTop: 0,
                            transition: "all .2s ease",
                          }
                        : {
                            marginTop: "-270px",
                            transition: "all .2s ease",
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
