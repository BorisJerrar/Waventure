import React, { useState, useEffect } from 'react'
import AudioPlayer from 'react-h5-audio-player';
import "../style/Player.css";

export default function Player() {
    const serverPath = process.env.REACT_APP_SERVER_PATH
    const [episodeNumber, setEpisodeNumber] = useState(1)
    const [cover, setCover] = useState('')
    const [episodeInfos, setEpisodeInfos] = useState({})
    const [urlAudio, setUrlAudio] = useState(``)
    useEffect(() => {
        const fetchingAudio = async() => {
            const track = await fetch(`${serverPath}/episodesNumber/${episodeNumber}`)
            const data = await track.json()
            await setEpisodeInfos(...data)
            await setUrlAudio(`${serverPath}/sound/${data[0].mp3file}`)
        }
        const fetchingImgAudio = async() => {
            const reponse = await fetch(`http://localhost:4000/series/2`)
            const data = await reponse.json()
            await setCover(data[0].image)
        }
        const fetchingInfo = async() => {
            const reponse = await fetch(`http://localhost:4000/sagaInfo/3`)
            const data = await reponse.json()
            console.log(data);
            
        }
        fetchingAudio()
        fetchingImgAudio()
        fetchingInfo()
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
    <div className='playerHeader'>
    <p>Episode 1 | La Legende</p>
    <p>Nico {'&'} Matt</p>
    </div>
)
    }
    const footer = () => {
return(
    <div className='playerFooter'>
    <p>La Legende de Xantah</p>
    <p>Synopsys</p>
    <p>En savoir plus</p>
    </div>
)
    }
    return (
        <div className='playerWarper'>
            <img src={`${serverPath}/images/${cover}`} alt='mettre desd alt' />
        <AudioPlayer
        layout={'horizontal'}
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
      </div>
    )
}