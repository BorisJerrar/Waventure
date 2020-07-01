import React, { useEffect, useState, useContext } from "react";
import "../style/search.css";
import Context from "../context/context";
import Card from "../components/Card";
import getData from "../utiles/getData";

export default function Search({ uniqueSearch, lunchingEpisode }) {
  console.log(uniqueSearch);
  
  const { serverPath, favoriteInfo } = useContext(Context);
  const [uniqueSerie, setUniqueSerie] = useState([]);
  useEffect(() => {
      getData(`serieSynopsis?search=%${uniqueSearch}%`,setUniqueSerie, "")

  }, [uniqueSearch, serverPath, favoriteInfo]);

  return (
    <div className="bodySearch">
      {uniqueSerie.map((item, index) => {
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
            lunchingEpisode={(serie_id, episode) =>
              lunchingEpisode(serie_id, episode)
            }
          />
        );
      })}
    </div>
  );
}
