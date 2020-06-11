import React, { useState, useEffect, useRef } from "react";
import AudioPlayer from "react-h5-audio-player";
import "../style/Player.css";

export default function Player({ serieId , index, setIndex}) {
  const serverPath = process.env.REACT_APP_SERVER_PATH;
  const [episodeInfos, setEpisodeInfos] = useState({});
  const [synopsis, setSynopsis] = useState(false);
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
const showSynopsis = () => {
  setSynopsis(!synopsis)
}
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
        <p className="playerHeaderInfo" style={synopsis?{fontSize:'12px'}: {fontSize:'28px'}}>
          Episode{" "}
          {episodeInfos && episodeInfos.episode_nb
            ? JSON.stringify(episodeInfos.episode_nb)
            : ""}{" "}
          {"|"} {
          episodeInfos && episodeInfos.title
            ? episodeInfos.title
            : ""
          } {"|"} {episodeInfos && episodeInfos.author ? episodeInfos.author : ""}
          
        </p>
      <p className='synoPlayer' style={synopsis && episodeInfos && episodeInfos.body?{opacity : '1'}:{opacity : '0'}}>{episodeInfos.body}</p>
      </div>
    );
  };
  const footer = () => {
    return (
      <div className="playerFooter">
        <p>Episodes</p>
        <p onClick={showSynopsis} className='playerFooterSynopsis'>Synopsis</p>
        <p>En savoir plus</p>
      </div>
    );
  };
  const player = useRef();
  console.log(player.current);
  
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
      defaultDuration={episodeInfos && episodeInfos.episode_duration?episodeInfos.episode_duration: ''}
        layout={"horizontal"}
        header={header()}
        footer={footer()}
        src={urlAudio ? urlAudio : ""}
        preload={"metadata"}
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
