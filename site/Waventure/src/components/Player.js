import React, { useState, useEffect } from "react";
import AudioPlayer from "react-h5-audio-player";
import "../style/Player.css";
import PlayerHeader from "./PlayerHeader";
import PlayerFooter from "./PlayerFooter";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


export default function Player({
   serieId, 
   index, 
   setIndex, 
   playing, 
   toggleWrapper, 
   setToggleWrapper,
   setSagaEpisodeSaisonInfo,
   sagaEpisodeSaisonInfo
  }) {
  const serverPath = process.env.REACT_APP_SERVER_PATH;
  const [episodeInfos, setEpisodeInfos] = useState({});
  const [sagaInfo, setSagaInfo] = useState([]);
  const [synopsis, setSynopsis] = useState(false);
  const [episodes, setEpisodes] = useState(false);
  const [learnMore, setLearnMore] = useState(false);
  const [urlAudio, setUrlAudio] = useState(``);

  useEffect(() => {
    const fetchingEpisode = async () => {
     const fetching = await fetch(`${serverPath}/sagaInfo/${serieId}`)
      const response = await fetching.json()
        const dataInfo = await response
          setSagaInfo(dataInfo);
          setEpisodeInfos(dataInfo[index])
         if(dataInfo && dataInfo[index] && dataInfo[index].title && dataInfo[index].mp3_file && serverPath){
           setUrlAudio(
            `${serverPath}/sound/?saga=${dataInfo[index].title
              .split(" ")
              .join("")}&sound=${dataInfo[index].mp3_file}`
          )}
        }
    if (serieId !== -1) {
       fetchingEpisode();
    }
  }, [index, serieId, serverPath]);

  const nextSaga = () => {
    if (index < sagaInfo.length - 1) {
      return setIndex(index + 1);
    } else {
      return index;
    }
  };

  const prevSaga = () => {
    if (index > 0) {
      return setIndex(index - 1);
    } else {
      return index;
    }
  };
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
            ? `${serverPath}/images/${episodeInfos.image}`:''
        }
        alt={
          episodeInfos && episodeInfos.image
            ? `Cover of ${episodeInfos.image}`
            : "Cover Waventure"
        }
        className="mainCover"
      />
      <AudioPlayer
        customIcons={{
          pause: 
            <FontAwesomeIcon
            className="btn-media-player"
            icon={['fas', 'pause'] }
          />
          ,
          play:
            <FontAwesomeIcon
            className="btn-media-player"
            icon={['fas', 'play'] }
          />,
          next:
            <FontAwesomeIcon
            className="btn-media-player"
            icon={['fas', 'step-forward'] }
          />,
          previous:
            <FontAwesomeIcon
            className="btn-media-player"
            icon={['fas', 'step-backward'] }
          />,
        }}
        defaultDuration={
          episodeInfos && episodeInfos.episode_duration
            ? episodeInfos.episode_duration
            : ""
        }
        layout={"horizontal"}
        header={<PlayerHeader
         synopsis={synopsis} 
         learnMore={learnMore} 
         episodes={episodes} 
         setEpisode={setEpisodes} 
         episodeInfos={episodeInfos} 
         sagaInfo={sagaInfo} 
         setSagaEpisodeSaisonInfo={setSagaEpisodeSaisonInfo}
         sagaEpisodeSaisonInfo={sagaEpisodeSaisonInfo}
         setIndex={setIndex} 
         />
        }
        footer={<PlayerFooter 
          setSynopsis={setSynopsis} 
          synopsis={synopsis} 
          setLearnMore={setLearnMore} 
          episodes={episodes} 
          setEpisodes={setEpisodes} 
          serieId={serieId}  
          toggleWrapper={toggleWrapper}
          setToggleWrapper={setToggleWrapper}
          sagaInfo={sagaInfo}
          setSagaEpisodeSaisonInfo={setSagaEpisodeSaisonInfo}
          sagaEpisodeSaisonInfo={sagaEpisodeSaisonInfo}
          />}
        src={urlAudio ? urlAudio : ""}
        preload={"none"}
        autoPlay={playing ? true : false}
        showSkipControls={true}
        showJumpControls={false}
        onClickNext={nextSaga}
        onClickPrevious={prevSaga}
        onEnded={nextSaga}

      />    
    </div>
  );
}
