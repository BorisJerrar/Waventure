import React, {useContext} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../style/PlayerHeader.css";
import Context from '../context/context'
import nextSaga from "../utiles/nextSaga";

export default function PlayerHeader({episodeInfos, sending, sendingReducer}) {
  const { 
    synopsis,
    learnMore,
    episodes,
    setEpisodes,
    reducer,
    setIndex,
    sagaEpisodeSaisonInfo,
    serieId
  } = useContext(Context);

  const closingPlayer = () => {
    sending()
  }
  const reducingPlayer = () => {
    sendingReducer()
  }
  const changingEpisode = (e,each) => {
    setEpisodes(false);
    setIndex(e.target.attributes[0].value -1)
    let indexOnClick = e.target.attributes[0].value -1
     nextSaga(indexOnClick, serieId, each.episode_id)
  };
  let increm = 0;
  return (
    <div className="playerHeader" style={reducer? {position: "absolute",margin: "auto", left: 0, top: 0, width: "100%"}:{"":""}}>
      <FontAwesomeIcon icon={["fas", "times"]} className='cancerler' size="4x"  onClick={closingPlayer} style={reducer? {position: "absolute",margin: "auto", right: '1vw', top: "10px", maxWidth:"15px"}:{"":""}}/>
      <FontAwesomeIcon icon={["fas", "sort-up"]} className='reducer' size="4x" onClick={reducingPlayer} style={reducer? {position: "absolute",margin: "auto",  right: '3vw', top: "-5px", transform: "rotate(180deg)", maxWidth:"15px"}:{"":""}}/>
      <p
        className="playerHeaderInfo"
        style={
          synopsis || learnMore || episodes
            ? { fontSize: "12px" }
            :  reducer?{ fontSize: "12px"}
            : { fontSize: "21px" }
        }
      >
        Episode{" "}
        {episodeInfos && episodeInfos.episode_nb
          ? `${JSON.stringify(episodeInfos.episode_nb)} ${
              episodeInfos.episode_title
                ? `| ${episodeInfos.episode_title}`
                : ""
            }`
          : ""}{" "}
        {"|"} {episodeInfos && episodeInfos.title ? episodeInfos.title : ""}{" "}
        {"|"} {episodeInfos && episodeInfos.author ? episodeInfos.author : ""}
      </p>
      <p
        className="synoPlayer"
        style={
          synopsis && episodeInfos && episodeInfos.body
            ? { opacity: "1" }
            : { opacity: "0" }
        }
      >
        {episodeInfos && episodeInfos.body}
      </p>
      <div
        className="episodeList"
        style={
          episodes
            ? { visibility: "visible", opacity: "1" }
            : { visibility: "hidden", opacity: "0" }
        }
      >
        {sagaEpisodeSaisonInfo.map((each, index) => {
          return (
            <div key={index}>
              <p
                className={"episodeUnique season"}
                style={{ cursor: "default" }}
              >
                Saison {each.season_nb}
              </p>
              {each.episode_number.map((item, indexTwo) => {
                increm += 1;
                return (
                  <p
                    onClick={(e) => changingEpisode(e,each)}
                    key={increm}
                    src-key={increm}
                    className={"episodeUnique "}
                    
                  >
                    Episode {item}{" "}
                    {each.episode_title[indexTwo]
                      ? `| ${each.episode_title[indexTwo]}`
                      : ""}
                  </p>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}
