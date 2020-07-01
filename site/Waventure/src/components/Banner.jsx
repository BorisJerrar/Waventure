import React, { useState, useEffect, useContext } from "react";
import "../style/Banner.css";
import Context from "../context/context";

import BannerCover from "./BannerCover"

export default function Banner({ lunchingEpisode }) {
  // data one serie star
  const [wedette, setWedette] = useState([]);

  const {serverPath} = useContext(Context)
  //variable environnement

  const url = process.env.REACT_APP_DYNAMIC_IMG_PATH;

  useEffect(() => {
    /**
     * @param serverPath path server stack in .env
     * @param setState  hook useState
     * @param serverParams
     */
    const fetchWedette = async () => {
      const response = await fetch(`${serverPath}/serieSynopsis/2`);
      const data = await response.json();
      setWedette(data[0]);
    };
    fetchWedette();
  }, [serverPath]);
  
  

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

      <div className="wedetteDescription">
        <h3 className="wedetteTitle">{wedette.title}</h3>
        <p className="wedetteSynopsis">{wedette.body}</p>
      </div>
      <img
        className="backgroundImg"
        src={wedette && wedette.image_bg ?`${url}/${wedette.image_bg}`:""}
        alt={`Bg_image ${wedette && wedette.title ? wedette.title : ""}`}
      />
    </div>
  );
}
