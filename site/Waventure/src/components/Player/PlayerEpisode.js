import React, { useEffect, useContext } from "react";
import Context from '../../context/context';
import getData from "../../utiles/getData"

export default function PlayerEpisode({
  serieId,
  setSagaEpisodeSaisonInfo,
  title,
  setElement,
  element,
  setLearnMore,
  setLastElement,
}) {
  const {serverPath} = useContext(Context)
  useEffect(() => {
    getData("saisonAndEpisode", setSagaEpisodeSaisonInfo, `/${serieId}` )
  }, [setSagaEpisodeSaisonInfo, serieId, serverPath]);

  const showElement = () => {
    setLastElement(false);
    setLearnMore(false);
    setElement(!element);
  };
  return (
    <p
      onClick={showElement}
      style={
        element
          ? { borderBottom: "solid 2px #a487b3", color: "#fff" }
          : { borderBottom: "none" }
      }
      className="playerFooterItem"
    >
      {title}
    </p>
  );
}
