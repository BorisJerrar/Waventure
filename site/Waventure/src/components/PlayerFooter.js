import React from "react";
import "../style/PlayerFooter.css";
import PlayerFooterItem from "./PlayerFooterItem"
import PlayerMoreInfo from "./PlayerMoreInfo"

export default function PlayerFooter({
  setSynopsis,
  synopsis,
  episodes,
  setLearnMore,
  setEpisodes,
  serieId,
  toggleWrapper,
  setToggleWrapper
}) {
  

 
  const showMoreInfo = () =>{
    setToggleWrapper(!toggleWrapper)
  }

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

<PlayerMoreInfo
      setToggleWrapper={setToggleWrapper}
      toggleWrapper={toggleWrapper}
      serieId={serieId}
      />  


<p 
style={toggleWrapper? {borderBottom: 'solid 2px #a487b3', color: '#fff'}:{borderBottom: 'none'} } 
onClick={showMoreInfo} className="playerFooterItem"
>En savoir plus</p>
    </div>
  );
}
