import React, { useState, useEffect } from "react";
import CategoryUnique from "./CategoryUnique";
import "../style/Categorie.css";
import { Slide } from "react-slideshow-image";

export default function Categorie({ category, lunchingEpisode }) {
  const [series, setSeries] = useState([]);
  const [hover, setHover] = useState(false);
  const [information, setInformation] = useState(false);
  const [hoverItem, setHoverItem] = useState([]);
  const [synopsis, setSynopsis] = useState("");
  const url = process.env.REACT_APP_DYNAMIC_IMG_PATH;
  const urlimg = process.env.REACT_APP_STATIC_IMG_PATH;
  const server = process.env.REACT_APP_SERVER_PATH;
  const [matches,setMaches]  = useState(window.innerWidth)
  const lunchingEpisodeCategorie = (item) => {
    lunchingEpisode(item.serie_id);
  };

  window.addEventListener("resize", ()=> { 
    setTimeout( () =>{setMaches(window.innerWidth)}, 700)})

  useEffect(() => {
      const fetchSeries = async () => {
      const response = await fetch(`${server}/serieCategory/${category}`);
      const data = await response.json();
      let temp = [];
      if (matches <= 990) {
        for (let i = 0; i < Math.ceil(data.length / 4); i++) {
          temp.push(data.slice(i * 4, i * 4 + 4));
        }
      } else{
        for (let i = 0; i < Math.ceil(data.length / 5); i++) {
          temp.push(data.slice(i * 5, i * 5 + 5));
        }
      }
      setSeries(temp);
    };
    fetchSeries();
    const fetchSerieInformation = async () => {
      const response = await fetch(
        `${server}/sagaInfo/${hoverItem.serie_id}`
      );
      const data = await response.json();      
      setSynopsis(data[0].body);
    };
    if (hover) {
      fetchSerieInformation();
    }
  }, [category, hover, hoverItem.serie_id, server, matches]);

  let properties = {
    indicators: true,
    autoplay: false,
    transitionDuration: 500,
  };

  
  const settingHover = (item) => {
    setHover(true);
    setHoverItem(item);
  };
  const unsettingHover = () => {
    setHover(false);
    setInformation(false);
  };
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
                    urlimg={urlimg}
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
