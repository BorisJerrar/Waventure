import React, { useState, useEffect, useRef } from "react";
import "../style/Categorie.css";
import {Slide} from 'react-slideshow-image'

export default function Categorie({ category, lunchingEpisode}) {
  const [series, setSeries] = useState([]);
  const [lengthSeries, setLengthSeries] = useState('')
  const url = process.env.REACT_APP_DYNAMIC_IMG_PATH;
  const pathImg = process.env.REACT_APP_STATIC_IMG_PATH;


const lunchingEpisodeCategorie = (item) => {
    lunchingEpisode(item.serie_id)
}

const fetchSeries = async () => {
  const response = await fetch(
    `http://localhost:4000/serieCategory/${category}`
  );
  const data = await response.json();
  let temp = []
  for (let i = 0; i < Math.ceil(data.length/5) ; i++) {
    temp.push(data.slice(i*5, i*5 + 5))
  }  
  setSeries(temp)
  setLengthSeries(data.length)
};

  useEffect(() => {
    fetchSeries();
  }, [category]);

  let properties = {
    indicators: true,
    autoplay: false,
    transitionDuration: 500, 
  }

  if(lengthSeries <= 5){
    properties = {
      ...properties,
      arrows: false,
      indicators: false,
    }
  }

  const zoomItem = (e) =>{
    console.log(e.target.style.width);
    e.target.style.width = '17vw';
    e.target.style.margin = '0vw' 
  }

  const reinitializeSize = (e)=>{
    e.target.style.width = '15vw'
    e.target.style.margin = '1vw'
  }
  

  return (
    <div className="catalog">
      <h2 className="catalogTitle">{category}</h2>

        <div className="containerSlide">
          <Slide {...properties}>
            {series.map((array, arrIndex)=>{
              return (
                <div key={arrIndex} style={{display: 'flex', alignItems: "center"}}>
                {array.map((item, index)=>{
                  return(
                    <img key={index} onMouseOver={zoomItem} onMouseOut={reinitializeSize} style={{width:`15vw`, margin: "1vw"}} src={`${url}/${item.image}`} alt=""/>
                  )
                })}
              </div>
              )
            })}    
          </Slide>
        </div>
    </div>

  );
}
