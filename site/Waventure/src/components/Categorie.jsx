import React, { useState, useEffect } from "react";
import "../style/Categorie.css";
import { Slide } from "react-slideshow-image";

export default function Categorie({ category, lunchingEpisode }) {
  const [series, setSeries] = useState([]);
  const [hover, setHover] = useState(false);
  const [information, setInformation] = useState(false);
  const [hoverItem, setHoverItem] = useState([]);
  const [synopsis, setSynopsis] = useState('');
  const [dataHover, setDataHover] = useState({});
  const [lengthSeries, setLengthSeries] = useState("");
  const url = process.env.REACT_APP_DYNAMIC_IMG_PATH;
  const urlimg = process.env.REACT_APP_STATIC_IMG_PATH;
  const server = process.env.REACT_APP_SERVER_PATH;

  const lunchingEpisodeCategorie = (item) => {
    lunchingEpisode(item.serie_id);
  };
  useEffect(() => {
    const fetchSeries = async () => {
      const response = await fetch(`${server}/serieCategory/${category}`);
      const data = await response.json();
      let temp = [];
      for (let i = 0; i < Math.ceil(data.length / 5); i++) {
        temp.push(data.slice(i * 5, i * 5 + 5));
      }
      setSeries(temp);
      setLengthSeries(data.length);
    };
    fetchSeries();
    const fetchSerieInformation = async () => {
      const response = await fetch(
        `http://localhost:4000/sagaInfo/${hoverItem.serie_id}`
      );
      const data = await response.json();
      setDataHover(data[0]);
      setSynopsis(data[0].body);
    };
    if (hover) {
      fetchSerieInformation();
    }
  }, [category, hover, hoverItem.serie_id, server]);

  let properties = {
    indicators: true,
    autoplay: false,
    transitionDuration: 500,
  };

  if (lengthSeries <= 5) {
    properties = {
      ...properties,
      arrows: false,
      indicators: false,
    };
  }
  const settingHover = (item) => {
    setHover(true);
    setHoverItem(item);
    console.log(dataHover);
    
  };
  const unsettingHover = () => {
    setHover(false);
    setInformation(false);
  };
  const informationShow = (e) => {
    e.stopPropagation()
    setInformation(!information);
  };
  return (
    <div className="catalog">
      <h2 className="catalogTitle">{category}</h2>
      <div className="containerSlide">
        <Slide {...properties}>
          {series.map((array, arrIndex) => {
            return (
              <div className="categoryContainer" key={arrIndex} style={{}}>
                {array.map((item, index) => {
                  return (
                    <div
                      key={index}
                      className={"hoverInformationContainer"}
                      onMouseEnter={() => settingHover(item)}
                      onMouseLeave={unsettingHover}
                    >
                      <div
                        className="hoverInformation"
                        onClick={() => {
                          lunchingEpisodeCategorie(item);
                        }}
                      >
                                                                      <h6
                          style={
                            information
                              ? { visibility: "visible" }
                              : { visibility: "hidden" }
                          }
                        >
                          {synopsis}
                        </h6>
                        <img
                          className="InformationCategory"
                          onClick={informationShow}
                          src={`${urlimg}/information.svg`}
                          alt="play button"
                        />
                        <p
                          style={
                            information
                              ? { visibility: "hidden" }
                              : { visibility: "visible" }
                          }
                        >
                          {item.title}
                        </p>
                        <p
                          style={
                            information
                              ? { visibility: "hidden" }
                              : { visibility: "visible" }
                          }
                        >
                          {item.author}
                        </p>
                        <p
                          style={
                            information
                              ? { visibility: "hidden" }
                              : { visibility: "visible" }
                          }
                        >
                          Ep.1 S.2
                        </p>
                        <i className="watchTime"></i>
                        <img
                          className="playLogoCategory"
                          src={`${urlimg}/btnPlay.svg`}
                          alt="play button"
                        />
                      </div>
                      <img
                        className="imageSlideShow"
                        src={`${url}/${item.image}`}
                        alt={"cover of" + item.title}
                      />
                    </div>
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
