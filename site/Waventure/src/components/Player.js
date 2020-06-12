import React, { useState, useEffect } from "react";
import AudioPlayer from "react-h5-audio-player";
import "../style/Player.css";
import PlayerHeader from "./PlayerHeader";
import PlayerFooter from "./PlayerFooter";

export default function Player({ serieId, index, setIndex, playing}) {
  const serverPath = process.env.REACT_APP_SERVER_PATH;
  const [episodeInfos, setEpisodeInfos] = useState({});
  const [sagaInfo, setSagaInfo] = useState([]);
  const [synopsis, setSynopsis] = useState(false);
  const [episodes, setEpisodes] = useState(false);
  const [learnMore, setLearnMore] = useState(false);
  const [urlAudio, setUrlAudio] = useState(``);

  useEffect(() => {
    const fetchingEpisode = async () => {
      const reponseInfos = await fetch(`${serverPath}/sagaInfo/${serieId}`);
      const dataInfo = await reponseInfos.json();
      setSagaInfo(dataInfo);
      setEpisodeInfos(dataInfo[index]);
      setUrlAudio(
        `${serverPath}/sound/?saga=${dataInfo[index].title.split(" ").join("")}&sound=${dataInfo[index].mp3_file}`
      );
      console.log( `${serverPath}/sound/?saga=${dataInfo[index].title.split(" ").join("")}&sound=${dataInfo[index].mp3_file}`);
      
    };
    fetchingEpisode();
  }, [index, serieId, serverPath]);
  return (
    <div
      className="playerWarper"
      style={
        episodes
          ? { minHeight: "370px", maxHeight: "370px" }
          : { minHeight: "270px", maxHeight: "270px" }
      }
    >
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
        className='mainCover'
      />
      <AudioPlayer
      customIcons={{pause: <img src='./img/pause.svg' alt='pause icon'/>, play: <img src='./img/play.svg' alt='play icon'/>, next: <img src='./img/next.svg' alt='next track icon'/>, previous: <img src='./img/prev.svg' alt='previous track icon'/>}}
        defaultDuration={
          episodeInfos && episodeInfos.episode_duration
            ? episodeInfos.episode_duration
            : ""
        }
        layout={"horizontal"}
        header={<PlayerHeader synopsis={synopsis} learnMore={learnMore} episodes={episodes} episodeInfos={episodeInfos} sagaInfo={sagaInfo} setIndex={setIndex}/>}
        footer={<PlayerFooter setSynopsis={setSynopsis} synopsis={synopsis} setLearnMore={setLearnMore} episodes={episodes} setEpisodes={setEpisodes}/>}
        src={urlAudio ? urlAudio : ""}
        preload={"metadata"}
        autoPlay={playing?true:false}
        showSkipControls={true}
        showJumpControls={false}
      />
    </div>
  );
}
