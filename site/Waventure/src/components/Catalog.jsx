import React, { useContext, useEffect } from "react";
import Categorie from "./Categorie";
import getData from "../utiles/fetchData"
import Context from "../context/context"

export default function Catalog({ lunchingEpisode }) {

const {categories, setCategories}= useContext(Context)
  useEffect(() => {
    getData("category", setCategories, "");
  }, []);

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
