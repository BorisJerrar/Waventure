import React, { useState, useEffect } from "react";
import Card from '../components/Card'
export default function Newest({ lunchingEpisode, fetchingurl }) {
  const [newest, setNewest] = useState([]);
  useEffect(() => {
    const fetchNewest = async () => {
      const response = await fetch("http://localhost:4000/serieUploades");
      const data = await response.json();
      setNewest(data);
    };
    fetchNewest();
  }, [fetchingurl]);
  const url = process.env.REACT_APP_DYNAMIC_IMG_PATH;
  console.log(newest);
  const lunchingEpisodeCategorie = (item) => {
    lunchingEpisode(item.serie_id);
  };

  return (
    <div className="tab-content">
      <h3 className="newestTilte">Nouveautées</h3>
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
          />
        );
      })}
    </div>
  );
}
