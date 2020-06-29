import React, { useState, useEffect, useContext } from "react";
import Categorie from "./Categorie";
import Context from "../context/context";

export default function Catalog({ lunchingEpisode }) {
  const [categories, setCategories] = useState([]);
  const {serverPath} = useContext(Context)

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await fetch(`${serverPath}/category`);
      const data = await response.json();
      setCategories(data);
    };
    fetchCategories();
  }, [serverPath]);
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
