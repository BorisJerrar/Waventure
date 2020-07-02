import React, {useContext} from "react";
import "../../style/PlayerFooter.css";
import PlayerFooterItem from "./PlayerFooterItem"
import PlayerMoreInfo from "./PlayerMoreInfo"
import PlayerEpisode from "./PlayerEpisode"
import Context from '../../context/context'

export default function PlayerFooter({sagaInfo}) {
  
const { 
  setSynopsis, 
  synopsis, 
  setLearnMore,
  episodes,
  setEpisodes,
  serieId,
  toggleWrapper,
  setToggleWrapper,
  setSagaEpisodeSaisonInfo,
  sagaEpisodeSaisonInfo,
  reducer
} = useContext(Context)
 
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
