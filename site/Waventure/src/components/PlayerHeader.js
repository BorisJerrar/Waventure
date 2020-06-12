import React from "react";
import "../style/PlayerHeader.css";

export default function PlayerHeader({
  synopsis,
  learnMore,
  episodes,
  episodeInfos,
  sagaInfo,
  setIndex,
}) {
  return (
    <div className="playerHeader">
      <p
        className="playerHeaderInfo"
        style={
          synopsis || learnMore || episodes
            ? { fontSize: "12px" }
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
      {synopsis && episodeInfos && episodeInfos.body?<p
        className="synoPlayer"
        style={
          synopsis && episodeInfos && episodeInfos.body
            ? {opacity: "1" }
            : { opacity: "0" }
        }
      >
        {episodeInfos.body}
      </p>:<p></p>}
      <div
        className="episodeList"
        style={episodes ? { opacity: "1" } : { opacity: "0" }}
      >
        {sagaInfo
          ? sagaInfo.map((each, index) => {
              return (
                <p
                  key={index}
                  className="episodeUnique"
                  onClick={() => setIndex(each.episode_nb - 1)}
                >
                  Episode {each.episode_nb} {each.episode_title}
                </p>
              );
            })
          : ""}
      </div>
    </div>
  );
}
