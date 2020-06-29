import React, { useState, useEffect, useContext } from "react";
import AudioPlayer from "react-h5-audio-player";
import "../style/Player.css";
import PlayerHeader from "./PlayerHeader";
import PlayerFooter from "./PlayerFooter";
import MainPlayerImg from "./MainPlayerImg";
import prevSaga from "../utiles/prevSaga";
import nextSaga from "../utiles/nextSaga";
import fetchinEpisodePlayer from "../utiles/fetchinEpisodePlayer";
import playerRefChecker from "../utiles/playerRefChecker";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Context from '../context/context'

export default function Player({sending, sendingReducer, playerRef}) {

  const { 
    serieId, 
    index, 
    setIndex, 
    reducer, 
    episodes
  } = useContext(Context);

  const serverPath = process.env.REACT_APP_SERVER_PATH;
  const [episodeInfos, setEpisodeInfos] = useState({});
  const [sagaInfo, setSagaInfo] = useState([]);
  const [urlAudio, setUrlAudio] = useState();
  const [playinTrigger, setPlayinTrigger] = useState(``);
  const receving = () => {
    playerRef.current.audio.current.pause();
    sending();
  };
  const recevingReducer = () => {
    sendingReducer();
  };
  useEffect(() => {
    if (serieId && serieId !== -1) {
      fetchinEpisodePlayer(index, serieId, setSagaInfo, setEpisodeInfos, function(data){
        setUrlAudio(
          `${data[index].title.split(" ").join("")}&sound=${
            data[index].mp3_file
          }`
        );
      });
    }
  }, [index, serieId, serverPath, playerRef]);
  useEffect(() => {
    setPlayinTrigger(urlAudio);
  }, [urlAudio]);

playerRefChecker(playerRef, reducer)

  return (
    <div
      className="playerWarper"
      style={
        episodes
          ? { minHeight: "370px", maxHeight: "370px" }
          : reducer
          ? { minHeight: "200px", maxHeight: "200px" }
          : { minHeight: "270px", maxHeight: "270px" }
      }
    >
<MainPlayerImg 
episodeInfos={episodeInfos}
reducer={reducer}
/>
      <AudioPlayer
        customIcons={{
          pause: (<FontAwesomeIcon className="btn-media-player" icon={["fas", "pause"]}/>),
          play: (<FontAwesomeIcon className="btn-media-player" icon={["fas", "play"]}/>),
          next: (<FontAwesomeIcon className="btn-media-player" icon={["fas", "step-forward"]}/>),
          previous: (<FontAwesomeIcon className="btn-media-player" icon={["fas", "step-backward"]}/>),
        }}
        defaultDuration={
          episodeInfos && episodeInfos.episode_duration
            ? episodeInfos.episode_duration
            : ""
        }
        layout={"horizontal"}
        header={
          <PlayerHeader
            episodeInfos={episodeInfos}
            sagaInfo={sagaInfo}
            sending={() => {
              receving();
            }}
            sendingReducer={() => {
              recevingReducer();
            }}
          />
        }
        footer={
          <PlayerFooter
            sagaInfo={sagaInfo}
          />
        }
        src={
          playinTrigger
            ? `${serverPath}/sound/?saga=` + playinTrigger
            : undefined
        }
        preload={"false"}
        showSkipControls={true}
        showJumpControls={false}
        onClickNext={() => nextSaga(index, setIndex,serieId, sagaInfo)}
        onClickPrevious={() => prevSaga(index, setIndex)}
        onEnded={() => nextSaga(index, setIndex)}
        autoPlay={true}
        ref={playerRef}
      />
    </div>
  );
}
