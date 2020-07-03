import React, { useState, useEffect } from "react";
import "../style/Banner.css";

import BannerCover from "./BannerCover"
import getData from "../utiles/getData";

export default function Banner({ lunchingEpisode }) {
  // data one serie star
  const [wedette, setWedette] = useState([]);

  
  //variable environnement
  const url = process.env.REACT_APP_DYNAMIC_IMG_PATH;

  useEffect(() => {
    getData("serieSynopsis", setWedette, "/2")
  }, []);

 
  
  
  

  return (
    <div className={"wedetteContainer"}>
      <BannerCover
        wedette={wedette}
        lunchingEpisode={lunchingEpisode}
        url={url}
      />
      <div className="wedetteLogoContainer">
        <span>
          <img src="./img/logoWedette.svg" alt="W" />
        </span>
        <h2 className="wedetteIndicator">edette</h2>
      </div>
<div className="wedetteSecondPart">

      <div className="wedetteDescription">
        <h3 className="wedetteTitle">{wedette && wedette[0] && wedette[0].title}</h3>
        <p className="wedetteSynopsis">{wedette && wedette[0] && wedette[0].body}</p>
      </div>
      </div>
      <img
        className="backgroundImg"
        src={wedette && wedette[0] && wedette[0].image_bg ?`${url}/${wedette[0].image_bg}`:""}
        alt={`Bg_image ${wedette && wedette[0] && wedette[0].title ? wedette[0].title : ""}`}
      />
    </div>
  );
}
