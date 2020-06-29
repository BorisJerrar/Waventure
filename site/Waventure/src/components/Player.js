import React, { useState, useEffect, useContext } from "react";
import AudioPlayer from "react-h5-audio-player";
import "../style/Player.css";
import PlayerHeader from "./PlayerHeader";
import PlayerFooter from "./PlayerFooter";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
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
  const token = localStorage.getItem("token");
  const receving = () => {
    playerRef.current.audio.current.pause();
    sending();
  };
  const recevingReducer = () => {
    sendingReducer();
  };
  useEffect(() => {
    const fetchingEpisode = async () => {
      var playingConfig = {
        method: "get",
        url: `${serverPath}/sagaInfo/${serieId}`,
      };

      axios(playingConfig)
        .then(function (response) {
          setSagaInfo(response.data);
          setEpisodeInfos(response.data[index]);
          if (
            serverPath &&
            response &&
            response.data &&
            response.data[index] &&
            response.data[index].title &&
            response.data[index].mp3_file
          ) {
            setUrlAudio(
              `${response.data[index].title.split(" ").join("")}&sound=${
                response.data[index].mp3_file
              }`
            );
          }
        })
        .catch(function (error) {
          Promise.reject(error);
        });
    };
    if (serieId && serieId !== -1) {
      fetchingEpisode();
    }
  }, [index, serieId, serverPath, playerRef]);
  const sendingEpisodeDurationInfo = (upadtedIndex) => {
    var config = {
      method: "put",
      url: `${serverPath}/listen?serie_id=${serieId}&duration=00:00:00&episode_id=${sagaInfo[upadtedIndex].episode_id}`,
      headers: {
        "x-access-token": token,
      },
    };
    axios(config)
      .then(function (response) {})
      .catch(function (error) {
        console.log(error);
      });
  };
  useEffect(() => {
    setPlayinTrigger(urlAudio);
  }, [urlAudio]);

  const nextSaga = () => {
    if (index < sagaInfo.length - 1) {
      setIndex(index + 1);
      sendingEpisodeDurationInfo(index + 1);
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
  if (
    playerRef &&
    playerRef.current &&
    playerRef.current.container &&
    reducer
  ) {
    playerRef.current.container.current.childNodes[2].childNodes[1].childNodes[2].childNodes[0].childNodes[0].style =
      "display: none";
    for (
      let i = 1;
      i <
      playerRef.current.container.current.childNodes[2].childNodes[1]
        .childNodes[2].childNodes[0].childNodes.length;
      i++
    ) {
      playerRef.current.container.current.childNodes[2].childNodes[1].childNodes[2].childNodes[0].childNodes[
        i
      ].style = "height: 10px";
    }

    playerRef.current.container.current.childNodes[2].childNodes[1].childNodes[2].childNodes[0].style =
      "position: absolute; right: 15vw; bottom: 5px";
    playerRef.current.container.current.childNodes[2].childNodes[1].style =
      "position: absolute; right: 10px; bottom: -55px; width: 50%";
    for (
      let i = 0;
      i <
      playerRef.current.container.current.childNodes[2].childNodes[1]
        .childNodes[1].childNodes.length;
      i++
    ) {
      playerRef.current.container.current.childNodes[2].childNodes[1].childNodes[1].childNodes[
        i
      ].childNodes[0].style = "width: 12px; height: 12px";
    }
  } else if (
    playerRef &&
    playerRef.current &&
    playerRef.current.progressBar &&
    !reducer
  ) {
    playerRef.current.container.current.childNodes[2].childNodes[1].childNodes[2].childNodes[0].childNodes[0].style =
      "";
    for (
      let i = 1;
      i <
      playerRef.current.container.current.childNodes[2].childNodes[1]
        .childNodes[2].childNodes[0].childNodes.length;
      i++
    ) {
      playerRef.current.container.current.childNodes[2].childNodes[1].childNodes[2].childNodes[0].childNodes[
        i
      ].style = "";
    }

    playerRef.current.container.current.childNodes[2].childNodes[1].childNodes[2].childNodes[0].style =
      "";
    playerRef.current.container.current.childNodes[2].childNodes[1].style = "";
    for (
      let i = 0;
      i <
      playerRef.current.container.current.childNodes[2].childNodes[1]
        .childNodes[1].childNodes.length;
      i++
    ) {
      playerRef.current.container.current.childNodes[2].childNodes[1].childNodes[1].childNodes[
        i
      ].childNodes[0].style = "";
    }
  }

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
        className="mainCover"
        style={
          reducer
            ? {
                minHeight: "120px",
                minWidth: "120px",
                maxHeight: "120px",
                maxWidth: "120px",
              }
            : {}
        }
      />
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
        onClickNext={nextSaga}
        onClickPrevious={prevSaga}
        onEnded={nextSaga}
        autoPlay={true}
        ref={playerRef}
      />
    </div>
  );
}
