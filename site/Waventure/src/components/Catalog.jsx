import React, { useState, useEffect } from "react";
import Categorie from "./Categorie";

export default function Catalog({ lunchingEpisode }) {
  const [categories, setCategories] = useState([]);
  const server = process.env.REACT_APP_SERVER_PATH;

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await fetch(`${server}/category`);
      const data = await response.json();
      setCategories(data);
    };
    fetchCategories();
  }, [server]);
  return categories.map((item, index) => {
    return (
      <Categorie
        key={index}
        category={item.name}
        lunchingEpisode={(serie_id, episode,) =>
          lunchingEpisode(serie_id, episode)
        }
      />
    );
  });
}
