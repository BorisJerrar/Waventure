import React, { useState, useEffect } from 'react'
import AudioPlayer from 'react-h5-audio-player';
import "../style/Player.css";

export default function Player() {
    const serverPath = process.env.REACT_APP_SERVER_PATH

    const [episodeNumber, setEpisodeNumber] = useState(1)
    const [episodeInfos, setEpisodeInfos] = useState({})
    const [urlAudio, setUrlAudio] = useState(``)
    useEffect(() => {
        const fetchingAudio = async() => {
            const track = await fetch(`${serverPath}/episodesNumber/${episodeNumber}`)
            const data = await track.json()
            await setEpisodeInfos(...data)
            console.log(...data);
            
            await setUrlAudio(`${serverPath}/sound/${data[0].mp3file}`)
        }
        fetchingAudio()
    },[episodeNumber,serverPath])
    const nextSaga = () => {
        console.log(episodeInfos);
        
        return setEpisodeNumber(episodeNumber + 1)
    }
    const prevSaga = () => {
        return setEpisodeNumber(episodeNumber - 1)
    }
    const header = () => {
return(
    <>
    <p>Episode 1 | La Legende</p>
    <p>Nico {'&'} Matt</p>
    </>
)
    }
    const footer = () => {
return(
    <>
    <p>La Legende de Xantah</p>
    <p>Synopsys</p>
    <p>En savoir plus</p>
    </>
)
    }
    return (
        <AudioPlayer
        header={header()}
        footer={footer()}
        src={urlAudio}
        onPlay={e => console.log(e)}
        showSkipControls={true}
        showJumpControls={false}
        onClickPrevious={() => {prevSaga()}}
        onClickNext={() => {nextSaga()}}
        onEnded={() => {nextSaga()}}
      />
    )
}