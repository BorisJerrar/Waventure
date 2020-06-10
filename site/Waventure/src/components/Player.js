import React, { useState, useEffect, useRef } from "react";
import AudioPlayer from "react-h5-audio-player";
import "../style/Player.css";

export default function Player() {
  const serverPath = process.env.REACT_APP_SERVER_PATH;
  const [episodeNumber, setEpisodeNumber] = useState(50);
  const [cover, setCover] = useState("");
  const [episodeInfos, setEpisodeInfos] = useState({});
  const [urlAudio, setUrlAudio] = useState(``);
  useEffect(() => {
    const fetchingAudio = async () => {
      const track = await fetch(
        `${serverPath}/episode/${episodeNumber}`
      );
      console.log(`${serverPath}/episode/${episodeNumber}`);
      const data = await track.json();
      await setEpisodeInfos(...data);
      await setUrlAudio(`${serverPath}/sound/${data[0].mp3_file}`);
    };
    const fetchingImgAudio = async () => {
      const reponse = await fetch(`http://localhost:4000/serie/1`);
      const data = await reponse.json();
      await setCover(data[0].image);
    };
    fetchingAudio();
    fetchingImgAudio();
  }, [episodeNumber, serverPath]);
  const nextSaga = () => {
    return setEpisodeNumber(episodeNumber + 1);
  };
  const prevSaga = () => {
    return setEpisodeNumber(episodeNumber - 1);
  };
  const header = () => {
    return (
      <div className="playerHeader">
        <p>Episode 1 | La Legende</p>
        <p>Nico {"&"} Matt</p>
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
  console.log(player.current);

  return (
    <div className="playerWarper">
      <img src={`${serverPath}/images/${cover}`} alt={`Cover of ${cover}`} />
      <AudioPlayer
        layout={"horizontal"}
        header={header()}
        footer={footer()}
        src={urlAudio}
        preload={"none"}
        onPlay={() => console.log(urlAudio)}
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
