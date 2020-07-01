import React, { useState, useEffect, useContext} from "react";
import Card from "../components/Card";
import getData from "../utiles/getData"
import Context from "../context/context";


export default function Newest({lunchingEpisode}) {
  const [newest, setNewest] = useState([]);
  const {favoriteInfo} = useContext(Context)
  useEffect(() => {
    getData("serieUploades", setNewest, "" )
  }, [favoriteInfo]);
  
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
