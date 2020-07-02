import React, { useContext, useEffect} from "react";
import SlideShow from "./SlideShow";
import getData from "../../utiles/getData"
import Context from "../../context/context"

export default function Catalog({ lunchingEpisode }) {
  const {categories, setCategories}= useContext(Context)

  useEffect(() => {
    getData("category", setCategories, "");
  }, [setCategories]);

  return categories.map((item, index) => {
    return (
      <SlideShow
        key={index}
        category={item.name}
        lunchingEpisode={(serie_id, episode,) =>
          lunchingEpisode(serie_id, episode)
        }
      />
    );
  });
}
