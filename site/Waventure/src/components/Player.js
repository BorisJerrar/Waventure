import React, { useState, useEffect, useRef } from "react";
import AudioPlayer from "react-h5-audio-player";
import "../style/Player.css";

export default function Player({ serieId, index, setIndex, reducer, setReducer}) {
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
        `${serverPath}/sound/?saga=${dataInfo[index].title}&sound=${dataInfo[index].mp3_file}`
      );
    };
    fetchingEpisode();
  }, [index, serieId, serverPath]);
  const reduce = () => {
    setReducer(!reducer)
    console.log(reducer);
    
  }
  const showSynopsis = () => {
    setEpisodes(false);
    setLearnMore(false);
    setSynopsis(!synopsis);
  };
  const showEpisode = () => {
    setSynopsis(false);
    setLearnMore(false);
    setEpisodes(!episodes);
  };
  const nextSaga = () => {
    return setIndex(index + 1);
  };
  const prevSaga = () => {
    if (index > 0) {
      return setIndex(index - 1);
    } else {
      return index;
    }
  };
  const header = () => {
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
              episodeInfos.episode_title? `| ${episodeInfos.episode_title}`:''
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
          {episodeInfos.body}
        </p>
        <div
          className="episodeList"
          style={episodes ? { opacity: "1" } : { opacity: "0" }}
        >
          {sagaInfo
            ? sagaInfo.map((each, index) => {
                return (
                  <p key={index} className="episodeUnique" onClick={() => setIndex(each.episode_nb -1)}>
                    Episode {each.episode_nb} {each.episode_title}
                  </p>
                );
              })
            : ""}
        </div>
      </div>
    );
  };
  const footer = () => {
    return (
      <div className="playerFooter">
        <p onClick={showEpisode} className="playerFooterSynopsis">
          Episodes
        </p>
        <p onClick={showSynopsis} className="playerFooterSynopsis">
          Synopsis
        </p>
        <p className="playerFooterSynopsis">En savoir plus</p>
        <img className='arrowRetre' onClick={reduce} src='./img/arrowback.svg' alt='test' />
      </div>
    );
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
        defaultDuration={
          episodeInfos && episodeInfos.episode_duration
            ? episodeInfos.episode_duration
            : ""
        }
        layout={"horizontal"}
        header={header()}
        footer={footer()}
        src={urlAudio ? urlAudio : ""}
        preload={"metadata"}
        autoPlay={true}
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
      />
    </div>
  );
}
