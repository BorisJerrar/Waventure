import React, { useState, useEffect, useContext } from "react";
import CategoryUnique from "./CategoryUnique";
import "../style/Categorie.css";
import { Slide } from "react-slideshow-image";
import fetchSeries from "../utiles/fetchSeries";
import lunchinEpisodeCategorie from "../utiles/lunchinEpisodeCategorie";
import Context from "../context/context";

export default function Categorie({ category, lunchingEpisode }) {
  
  const { matches, setMaches, token, serverPath } = useContext(Context);
  const [series, setSeries] = useState([]);
  const [hover, setHover] = useState(false);
  const [information, setInformation] = useState(false);
  const [hoverItem, setHoverItem] = useState([]);
  const [synopsis, setSynopsis] = useState("");
  const url = process.env.REACT_APP_DYNAMIC_IMG_PATH;


  /* First of all, cheking if user has already begun the audiodrama on click*/
  const lunchingEpisodeCategorieUtils = (item) => {
    lunchinEpisodeCategorie(item, (serie_id, episode) => lunchingEpisode(serie_id, episode))
  }
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
  }
)},[category, matches])
  useEffect(() => {
    /* Fetching  audio informations on hover*/
    const fetchSerieInformation = async () => {
      const response = await fetch(`${serverPath}/sagaInfo/${hoverItem.serie_id}`);
      const data = await response.json();
      setSynopsis(data[0].body);
    };
    if (hover) {
      fetchSerieInformation();
    }
  }, [category, hover, hoverItem.serie_id, serverPath, token, matches]);
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
                      lunchingEpisodeCategorie={lunchingEpisodeCategorieUtils}
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
