import React, { useState, useEffect} from "react";
import Card from "../components/Card";
import getData from "../utiles/getData"


export default function Newest({lunchingEpisode}) {
  const [newest, setNewest] = useState([]);

  useEffect(() => {
    getData("serieUploades", setNewest, "" )
  }, []);
  
  return (
    <div className="tab-content">
      <h3 className="card-main-title">Nouveautées</h3>
      {newest.map((item, index) => {
        return (
          <Card
            key={index}
            item={item}
            title={item.title}
            image={item.image}
            imageLg={item.image_lg}
            imageBg={item.image_bg}
            synopsis={item.body}
            duration={item.duration}
            season={item.season}
            author={item.author}
            lunchingEpisode={(serie_id, episode) => lunchingEpisode(serie_id, episode)}
          />
        );
      })}
    </div>
  );
}
