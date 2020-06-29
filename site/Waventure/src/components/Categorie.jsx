import React, { useState, useEffect, useContext } from "react";
import CategoryUnique from "./CategoryUnique";
import "../style/Categorie.css";
import { Slide } from "react-slideshow-image";
import axios from "axios";
import fetchingNewEpisode from "../utiles/fetchingNewEpisode";
import fetchingExsistingEpisode from "../utiles/fetchingExsistingEpisode";
import fetchSeries from "../utiles/fetchSeries";
import didHeAlreadyBegin from "../utiles/didHeAlreadyBegin";
import Context from "../context/context";

export default function Categorie({ category, lunchingEpisode }) {
  const { matches, setMaches } = useContext(Context);
  const token = localStorage.getItem("token");
  const [series, setSeries] = useState([]);
  const [hover, setHover] = useState(false);
  const [information, setInformation] = useState(false);
  const [hoverItem, setHoverItem] = useState([]);
  const [synopsis, setSynopsis] = useState("");
  const url = process.env.REACT_APP_DYNAMIC_IMG_PATH;
  const server = process.env.REACT_APP_SERVER_PATH;

  /* First of all, cheking if user has already begun the audiodrama on click*/
  const lunchingEpisodeCategorie = (item) => {
    didHeAlreadyBegin(item, function (config) {
      axios(config)
        .then(function (response) {
          /* If not, lunching first episode of the audiodrama cliked*/
          if (response.data.length === 0) {
            fetchingNewEpisode(item, function (fetchconfig) {
              axios(fetchconfig)
                .then(function (response) {
                  return lunchingEpisode(item.serie_id, 0);
                })
                .catch(function (error) {
                  console.log(error);
                });
            });
                      /*  If yes, fetching datas, and resuming episode*/
          } else {
            fetchingExsistingEpisode(...response.data, function (
              item,
              response
            ) {
              lunchingEpisode(
                item.serie_id,
                response.findIndex(
                  (UniqueItem) => UniqueItem.episode_id === item.episode_id
                )
              );
            });
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    });
  };
  /* Listening to windows resize to display audiodrama in fuction of width */
  useEffect(() => {
    let mounted = true;
    window.addEventListener("resize", () => {
      setTimeout(() => {
        if (mounted) {
          setMaches(window.innerWidth);
        }
      }, 300);
    });
  });
  useEffect(() => {
        /* Fetching  audiodrama to displaying it*/
    fetchSeries(category, matches, function (temp) {
      setSeries(temp);
    });
    /* Fetching  audio informations on hover*/
    const fetchSerieInformation = async () => {
      const response = await fetch(`${server}/sagaInfo/${hoverItem.serie_id}`);
      const data = await response.json();
      setSynopsis(data[0].body);
    };
    if (hover) {
      fetchSerieInformation();
    }
  }, [category, hover, hoverItem.serie_id, server, token, matches]);
/*  properties for the npm <Slide />*/
  let properties = {
    indicators: true,
    autoplay: false,
    transitionDuration: 500,
  };
  /* On Mouse Enter => Trigger Hover Hooks and changing HoverItems informations*/
  const settingHover = (item) => {
    setHover(true);
    setHoverItem(item);
  };
    /* On Mouse Leave => Trigger Hover Hooks and reinitialize display of synopsis*/
    const unsettingHover = () => {
      setHover(false);
      setInformation(false);
    };
    /* On Click => display of synopsis*/
  const informationShow = (e) => {
    e.stopPropagation();
    setHover(!hover);
    setInformation(!information);
  };

  return (
    <div className="catalog">
      <h2 className="catalogTitle">{category}</h2>
      <div className="containerSlide">
        <Slide {...properties}>
          {series.map((array, arrIndex) => {
            return (
              <div className="categoryContainer" key={arrIndex}>
                {array.map((item, index) => {
                  return (
                    <CategoryUnique
                      item={item}
                      key={index}
                      settingHover={(item) => settingHover(item)}
                      unsettingHover={() => unsettingHover()}
                      lunchingEpisodeCategorie={lunchingEpisodeCategorie}
                      information={information}
                      synopsis={synopsis}
                      hover={hover}
                      informationShow={(e) => informationShow(e)}
                      url={url}
                    />
                  );
                })}
              </div>
            );
          })}
        </Slide>
      </div>
    </div>
  );
}
