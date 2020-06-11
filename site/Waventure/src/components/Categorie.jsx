import React, { useState, useEffect, useRef } from "react";
import "../style/Categorie.css";

export default function Categorie({ category }) {
  const [series, setSeries] = useState([]);
  const [toggle, setToggle] = useState(false);
  const slider = useRef(null);
  const [positionSlider, SetPositionSlider] = useState("");
  const url = process.env.REACT_APP_DYNAMIC_IMG_PATH;
  const pathImg = process.env.REACT_APP_STATIC_IMG_PATH;

  const slideCoverLeft = (e) => {
    const position = slider.current.offsetLeft - 300;
    slider.current.style.marginLeft = position + "px";
    setToggle(true);
  };
  const slideCoverRight = (e) => {
    const position = slider.current.offsetLeft + 300;
    slider.current.style.marginLeft = position + "px";
  };

  useEffect(() => {
    const fetchSeries = async () => {
      const response = await fetch(
        `http://localhost:4000/serieCategory/${category}`
      );
      const data = await response.json();
      setSeries(data);
    };
    fetchSeries();
  }, [category]);

  return (
    <div className="catalog">
      <h2 className="catalogTitle">{category}</h2>

      <div className="catalogCoverContainer">
        <div ref={slider} className="sliderCover">
          {series.map((item, index) => {
            return (
              <img
                key={index}
                onClick={() => console.log(item)}
                className="catalogCover"
                src={`${url}/${item.image}`}
                alt=""
              />
            );
          })}
        </div>

        <img
          className="arrowCatalogFront"
          onClick={slideCoverLeft}
          src={`${pathImg}/arrowCatalog.svg`}
          style={
            series.length >= 5 ? { display: "block" } : { display: "none" }
          }
          alt=""
        />
        <img
          className="arrowCatalogBack"
          onClick={slideCoverRight}
          style={toggle ? { display: "block" } : { display: "none" }}
          src={`${pathImg}/arrowCatalog.svg`}
          alt=""
        />
      </div>
    </div>
  );
}
