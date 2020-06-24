import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../style/PlayerHeader.css";

export default function PlayerHeader({
  synopsis,
  learnMore,
  episodes,
  setEpisode,
  episodeInfos,
  setIndex,
  sagaEpisodeSaisonInfo,
  sending,
  sendingReducer,
  reducer
}) {
  const closingPlayer = () => {
    sending()
  }
  const reducingPlayer = () => {
    sendingReducer()
  }
  const changingEpisode = (e) => {
    setIndex(e.target.attributes[0].value - 1);
    setEpisode(false);
  };
  let increm = 0;
  return (
    <div className="playerHeader">
      <FontAwesomeIcon icon={["fas", "times"]} className='cancerler' size="4x" onClick={closingPlayer}/>
      <FontAwesomeIcon icon={["fas", "sort-up"]} className='reducer' size="4x" onClick={reducingPlayer}/>
      <p
        className="playerHeaderInfo"
        style={
          synopsis || learnMore || episodes
            ? { fontSize: "12px" }
            :  reducer?{ fontSize: "15px"}
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
                    key={increm}
                    src-key={increm}
                    className={"episodeUnique "}
                    onClick={(e) => changingEpisode(e)}
                    
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
