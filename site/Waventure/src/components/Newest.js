import React, { useState, useEffect, useContext } from "react";
import Card from "../components/Card";
import Context from "../context/context";
export default function Newest({ lunchingEpisode, fetchingurl }) {
  const [newest, setNewest] = useState([]);
  const {serverPath} = useContext(Context)
  useEffect(() => {
    const fetchNewest = async () => {
      const response = await fetch(`${serverPath}/serieUploades`);
      const data = await response.json();
      setNewest(data);
    };
    fetchNewest();
  }, [fetchingurl, serverPath]);

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
          />
        );
      })}
    </div>
  );
}
