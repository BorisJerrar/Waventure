import React from "react";
import "../style/PlayerFooter.css";
import PlayerFooterItem from "./PlayerFooterItem"
import PlayerMoreInfo from "./PlayerMoreInfo"
import PlayerEpisode from "./PlayerEpisode"

export default function PlayerFooter({
  setSynopsis,
  synopsis,
  episodes,
  setLearnMore,
  setEpisodes,
  serieId,
  toggleWrapper,
  setToggleWrapper,
  sagaInfo,
  setSagaEpisodeSaisonInfo,
  sagaEpisodeSaisonInfo,
  reducer
}) {
  

 
  const showMoreInfo = () =>{
    setToggleWrapper(!toggleWrapper)
  }

  return (
    <div className="playerFooter"
    style={reducer?{visibility: "hidden"}:{"":""}}
    >

<PlayerEpisode
  title={"Episodes"}
  element={episodes}
  setElement={setEpisodes}
  setLastElement={setSynopsis}
  setLearnMore={setLearnMore}
  serieId={serieId}
  setSagaEpisodeSaisonInfo={setSagaEpisodeSaisonInfo}
  sagaEpisodeSaisonInfo={sagaEpisodeSaisonInfo}
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
      sagaInfo={sagaInfo}
      />  


<p 
style={toggleWrapper? {borderBottom: 'solid 2px #a487b3', color: '#fff'}:{borderBottom: 'none'} } 
onClick={showMoreInfo} className="playerFooterItem"
>En savoir plus</p>
    </div>
  );
}
