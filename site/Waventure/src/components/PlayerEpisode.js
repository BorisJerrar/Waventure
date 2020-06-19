import React, { useEffect } from "react";

export default function PlayerEpisode({
  serieId,
  setSagaEpisodeSaisonInfo,
  title,
  setElement,
  element,
  setLearnMore,
  setLastElement,
}) {
  const serverPath = process.env.REACT_APP_SERVER_PATH;
  useEffect(() => {
    const fetchingEpisodeBySeason = async () => {
      const fetching = await fetch(`${serverPath}/saisonAndEpisode/${serieId}`);
      const response = await fetching.json();
      setSagaEpisodeSaisonInfo(response);
    };
    fetchingEpisodeBySeason();
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
