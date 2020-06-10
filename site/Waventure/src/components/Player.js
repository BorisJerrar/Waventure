import React, { useState, useEffect, useRef } from "react";
import AudioPlayer from "react-h5-audio-player";
import "../style/Player.css";

export default function Player({serieId}) {  
  const serverPath = process.env.REACT_APP_SERVER_PATH;
  const [episodeNumber, setEpisodeNumber] = useState(1);
  const [serieInformation, setSerieInformation] = useState({});
  const [episodeInfos, setEpisodeInfos] = useState({});
  const [urlAudio, setUrlAudio] = useState(``);
  useEffect(() => {
    const fetchingSerie = async () => {
      const reponse = await fetch(`http://localhost:4000/serie/${serieId}`);
      const data = await reponse.json();
      await setSerieInformation(data[0]);
      console.log(serieInformation);
        const reponseInfos = await fetch(`http://localhost:4000/sagaInfo/${serieId}`);
        const dataInfo = await reponseInfos.json();
       setEpisodeInfos(dataInfo[0]);
          await setUrlAudio(`${serverPath}/sound/?saga=${serieInformation.title}&sound=${dataInfo[0].mp3_file}`)
  }
  fetchingSerie();
}, [serieId, serieInformation.title, serverPath])

  const nextSaga = () => {
    return setEpisodeNumber(episodeNumber + 1);
  };
  const prevSaga = () => {
    return setEpisodeNumber(episodeNumber - 1);
  };
  const header = () => {
    return (
      <div className="playerHeader">
        <p>Episode {episodeNumber} | {serieInformation?serieInformation.author:''} | {episodeInfos?episodeInfos.title:''}</p>
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
      <img src={serieInformation && serieInformation.image?`${serverPath}/images/${serieInformation.image}`:''} alt={`Cover of ${serieInformation.image}`} />
      <AudioPlayer
        layout={"horizontal"}
        header={header()}
        footer={footer()}
        src={urlAudio?urlAudio:''}
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
