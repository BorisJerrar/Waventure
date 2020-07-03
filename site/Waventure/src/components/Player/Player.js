import React, { useState, useEffect, useContext, Component } from "react";
import AudioPlayer from "react-h5-audio-player";
import "../../style/Player.css";
import PlayerHeader from "./PlayerHeader";
import PlayerFooter from "./PlayerFooter";
import MainPlayerImg from "../MainPlayerImg";
import prevSaga from "../../utiles/prevSaga";
import nextSaga from "../../utiles/nextSaga";
import fetchinEpisodePlayer from "../../utiles/fetchinEpisodePlayer";
import playerRefChecker from "../../utiles/playerRefChecker";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Context from '../../context/context';

export default function Player({ sending, sendingReducer, playerRef }) {
  const { serieId, index, setIndex, reducer, episodes, serverPath, activating, setActivating} = useContext(Context);
  const [episodeInfos, setEpisodeInfos] = useState({});
  const [sagaInfo, setSagaInfo] = useState([]);
  const [urlAudio, setUrlAudio] = useState();  
  const receving = () => {
    playerRef.current.audio.current.pause();
    sending();
  };
  const recevingReducer = () => {
    sendingReducer();
  };
  useEffect(() => {
    if (serieId && serieId !== -1) {
      fetchinEpisodePlayer(
        index,
        serieId,
        setSagaInfo,
        setEpisodeInfos,
        setUrlAudio
      );
    }
  }, [index, serieId, serverPath, playerRef]);

  playerRefChecker(playerRef, reducer);
Component.MainPlayerImg = MainPlayerImg
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
      <MainPlayerImg episodeInfos={episodeInfos} reducer={reducer} />
      <AudioPlayer
        customIcons={{
          pause: (
            <FontAwesomeIcon
              className="btn-media-player"
              icon={["fas", "pause"]}
            />
          ),
          play: (
            <FontAwesomeIcon
              className="btn-media-player"
              icon={["fas", "play"]}
            />
          ),
          next: (
            <FontAwesomeIcon
              className="btn-media-player"
              icon={["fas", "step-forward"]}
            />
          ),
          previous: (
            <FontAwesomeIcon
              className="btn-media-player"
              icon={["fas", "step-backward"]}
            />
          ),
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
        footer={<PlayerFooter sagaInfo={sagaInfo} />}
        src={urlAudio ? `${serverPath}/sound/?saga=` + urlAudio : undefined}
        preload={"false"}
        showSkipControls={true}
        showJumpControls={false}
        onClickNext={() => nextSaga(index, serieId, sagaInfo, setIndex, setActivating, activating)}
        onClickPrevious={() => prevSaga(index, setIndex)}
        onEnded={() => nextSaga(index, serieId, sagaInfo, setIndex, setActivating, activating)}
        autoPlay={true}
        ref={playerRef}
      />
    </div>
  );
}
