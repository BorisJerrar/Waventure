import React, { useState, useEffect, useRef } from "react";
import AudioPlayer from "react-h5-audio-player";
import "../style/Player.css";

export default function Player({ serieId , index, setIndex}) {
  const serverPath = process.env.REACT_APP_SERVER_PATH;
  const [episodeInfos, setEpisodeInfos] = useState({});
  const [urlAudio, setUrlAudio] = useState(``);

  useEffect(() => {
    const fetchingEpisode = async () => {
      const reponseInfos = await fetch(`${serverPath}/sagaInfo/${serieId}`);
      const dataInfo = await reponseInfos.json();
      setEpisodeInfos(dataInfo[index]);
      setUrlAudio(
        `${serverPath}/sound/?saga=${dataInfo[index].title}&sound=${dataInfo[index].mp3_file}`
      );
    };
    fetchingEpisode();
  }, [index, serieId, serverPath]);

  const nextSaga = () => {
    return setIndex(index + 1);
  };
  const prevSaga = () => {
    if (index > 0){
    return setIndex(index - 1)
  } else { return index}
  }
  const header = () => {
    return (
      <div className="playerHeader">
        <p>
          Episode{" "}
          {episodeInfos && episodeInfos.episode_nb
            ? JSON.stringify(episodeInfos.episode_nb)
            : ""}{" "}
          {"|"} {episodeInfos && episodeInfos.author ? JSON.stringify(episodeInfos.author) : ""} |{" "}
          {episodeInfos && episodeInfos.title ? JSON.stringify(episodeInfos.title) : ""}
        </p>
      </div>
    );
  };
  const footer = () => {
    return (
      <div className="playerFooter">
        <p>La Legende de Xantah</p>
        <p>Synopsys</p>
        <p>En savoir plus</p>
      </div>
    );
  };
  const player = useRef();
  return (
    <div className="playerWarper">
      <img
        src={
          episodeInfos && episodeInfos.image
            ? `${serverPath}/images/${episodeInfos.image}`
            : ""
        }
        alt={
          episodeInfos && episodeInfos.image
            ? `Cover of ${episodeInfos.image}`
            : "Cover Waventure"
        }
      />
      <AudioPlayer
        layout={"horizontal"}
        header={header()}
        footer={footer()}
        src={urlAudio ? urlAudio : ""}
        preload={"auto"}
        autoPlay={false}
        showSkipControls={true}
        showJumpControls={false}
        onClickPrevious={() => {
          prevSaga();
        }}
        onClickNext={() => {
          nextSaga();
        }}
        onEnded={() => {
          nextSaga();
        }}
        ref={player}
      />
    </div>
  );
}
