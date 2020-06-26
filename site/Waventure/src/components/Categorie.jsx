import React, { useState, useEffect } from "react";
import CategoryUnique from "./CategoryUnique";
import "../style/Categorie.css";
import { Slide } from "react-slideshow-image";
import axios from "axios";

export default function Categorie({ category, lunchingEpisode }) {
  const token = localStorage.getItem("token");
  const [series, setSeries] = useState([]);
  const [hover, setHover] = useState(false);
  const [information, setInformation] = useState(false);
  const [hoverItem, setHoverItem] = useState([]);
  const [synopsis, setSynopsis] = useState("");
  const [matches, setMaches] = useState(window.innerWidth);
  const url = process.env.REACT_APP_DYNAMIC_IMG_PATH;
  const server = process.env.REACT_APP_SERVER_PATH;


  const lunchingEpisodeCategorie = (item) => {
    const didHeAlreadyBegin = () => {
      var config = {
        method: "get",
        url: `${server}/listenVerificator?serie_id=${item.serie_id}`,
        headers: {
          "x-access-token": token,
        },
      };
      axios(config)
        .then(function (response) {
          if (response.data.length === 0) {
            fetchingEpisode();
          } else {
            fetchingExsistingEpisode(...response.data);
            
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    };
    const fetchingEpisode = async () => {
      const fetching = await fetch(`${server}/sagaInfo/${item.serie_id}`);
      const response = await fetching.json();
      const dataInfo = await response;
      AddingNew(dataInfo);
    };
    const fetchingExsistingEpisode = async (info) => {
      const fetching = await fetch(`${server}/sagaInfo/${item.serie_id}`);
      const response = await fetching.json();
      resume(info, response);
    };
    const AddingNew = (sagas) => {
      var creatingNew = {
        method: "post",
        url: `http://localhost:4000/listen?serie_id=${sagas[0].serie_id}&episode_id=${sagas[0].episode_id}`,
        headers: {
          "x-access-token": token,
        },
      };
      axios(creatingNew)
        .then(function (response) {
          lunchingEpisode(item.serie_id, 0);
        })
        .catch(function (error) {
          console.log(error);
        });
    };
    const resume = (userInfo, dataInfo) => {
      lunchingEpisode(
        item.serie_id,
        dataInfo.findIndex((item) => item.episode_id === userInfo.episode_id)
      );
    };

    didHeAlreadyBegin();
  };

  window.addEventListener("resize", () => {
    setTimeout(() => {
      setMaches(window.innerWidth);
    }, 300);
  });

  useEffect(() => {
    const fetchSeries = async () => {
      const response = await fetch(`${server}/serieCategory/${category}`);
      const data = await response.json();
      let temp = [];
      if (matches > 762 && matches < 990) {
        for (let i = 0; i < Math.ceil(data.length / 4); i++) {
          temp.push(data.slice(i * 4, i * 4 + 4));
        }
      } else if (matches < 762) {
        for (let i = 0; i < Math.ceil(data.length / 2); i++) {
          temp.push(data.slice(i * 2, i * 2 + 2));
        }
      } else {
        for (let i = 0; i < Math.ceil(data.length / 5); i++) {
          temp.push(data.slice(i * 5, i * 5 + 5));
        }
      }
      setSeries(temp);
    };
    fetchSeries();

    const fetchSerieInformation = async () => {
      const response = await fetch(`${server}/sagaInfo/${hoverItem.serie_id}`);
      const data = await response.json();
       setSynopsis(data[0].body);
    };
    if (hover) {
      fetchSerieInformation();
    }
  }, [category, hover, hoverItem.serie_id, server, token, matches]);

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
