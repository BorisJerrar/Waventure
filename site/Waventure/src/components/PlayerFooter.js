import React from "react";
import "../style/PlayerFooter.css";
import PlayerFooterItem from "./PlayerFooterItem"

export default function PlayerFooter({
  setSynopsis,
  synopsis,
  episodes,
  setLearnMore,
  setEpisodes,
}) {

  return (
    <div className="playerFooter">

<PlayerFooterItem
  title={"Episodes"}
  element={episodes}
  setElement={setEpisodes}
  setLastElement={setSynopsis}
  setLearnMore={setLearnMore}
/>

<PlayerFooterItem
  title={"Synopsis"}
  element={synopsis}
  setElement={setSynopsis}
  setLastElement={setEpisodes}
  setLearnMore={setLearnMore}
/>

<p className="playerFooterItem">En savoir plus</p>
    </div>
  );
}
