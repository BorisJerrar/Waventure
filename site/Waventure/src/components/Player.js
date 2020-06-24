import React, { useState, useEffect, useRef } from "react";
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
   sagaEpisodeSaisonInfo,
   sending,
   sendingReducer,
   reducer,
   learnMore,
   setLearnMore,
   episodes,
   setEpisodes,
   synopsis,
   setSynopsis
  }) {
  const serverPath = process.env.REACT_APP_SERVER_PATH;
  const [episodeInfos, setEpisodeInfos] = useState({});
  const [sagaInfo, setSagaInfo] = useState([]);

  const [urlAudio, setUrlAudio] = useState(``);
  const receving = () => {
    setUrlAudio(``)
    sending()
  }
  const recevingReducer = () => {
    sendingReducer()
  }
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
  const testRef = useRef()
  if(testRef && testRef.current && testRef.current.container){  console.log(testRef.current.container.current.childNodes[2].childNodes[1])}
  
  if(testRef && testRef.current && testRef.current.container && reducer){testRef.current.container.current.childNodes[2].childNodes[1].childNodes[2].childNodes[0].style = "display: none;"}
  if(testRef && testRef.current && testRef.current.container && !reducer){testRef.current.container.current.childNodes[2].childNodes[1].childNodes[2].childNodes[0].style = ""}
  
if(testRef && testRef.current && testRef.current.progressBar && reducer){testRef.current.container.current.childNodes[2].firstElementChild.style = "display: none;"}
if(testRef && testRef.current && testRef.current.progressBar && !reducer){testRef.current.container.current.childNodes[2].firstElementChild.style = ""}
  
  return (
    <div
      className="playerWarper"
      style={
        episodes
          ? { minHeight: "370px", maxHeight: "370px" }
          : reducer?{ minHeight: "100px", maxHeight: "100px" }: {minHeight: "270px",maxHeight: "270px"}
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
        style={reducer?{ minHeight: "100px",minWidth: "100px", maxHeight: "100px", maxWidth: "100px"}: {}}
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
         reducer={reducer}
         sending={()=>{receving()}}
         sendingReducer={()=>{recevingReducer()}}
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
          reducer={reducer}
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
        autoPlayAfterSrcChange={true}
        ref={testRef}
      />    
    </div>
  );
}
