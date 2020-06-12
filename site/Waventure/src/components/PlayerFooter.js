import React from "react";
import "../style/PlayerFooter.css";

export default function PlayerFooter({
  setSynopsis,
  synopsis,
  episodes,
  setLearnMore,
  setEpisodes,
}) {
  const showEpisode = () => {
    setSynopsis(false);
    setLearnMore(false);
    setEpisodes(!episodes);
  };
  const showSynopsis = () => {
    setEpisodes(false);
    setLearnMore(false);
    setSynopsis(!synopsis);
  };

  return (
    <div className="playerFooter">
      <p onClick={showEpisode} style={episodes?{borderBottom: 'solid 2px #a487b3', color: '#fff'}:{borderBottom: 'none'}} className="playerFooterSynopsis">
        Episodes
      </p>
      <p onClick={showSynopsis} style={synopsis?{borderBottom: 'solid 2px #a487b3', color: '#fff'}:{borderBottom: 'none'}} className="playerFooterSynopsis">
        Synopsis
      </p>
      <p className="playerFooterSynopsis">En savoir plus</p>
    </div>
  );
}
