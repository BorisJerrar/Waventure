import React, { useState, useEffect, useRef } from 'react'

export default function Player() {
    const serverPath = process.env.REACT_APP_SERVER_PATH

    const [episodeNumber, setEpisodeNumber] = useState(2)
    const [urlAudio, setUrlAudio] = useState(``)
    const [audioFile, setAudioFile] = useState()
    const [playing, setPlaying] = useState(false)
    useEffect(() => {
        const fetchingAudio = async() => {
            const track = await fetch(`${serverPath}/episodesNumber/${episodeNumber}`)
            const data = await track.json()
            await setUrlAudio(`${serverPath}/sound/${data[0].mp3file}`)
        }
        fetchingAudio()
    },[episodeNumber,serverPath])
    const audioRef = useRef(new Audio())
        const playFunction = async() => {
            setPlaying(!playing)
 if(!playing){
audioRef.current.src = urlAudio
audioRef.current.play()
 } else {
    audioRef.current.pause()
 }
}
    return (
        <div>
            <button onClick={() => setEpisodeNumber(episodeNumber - 1)}>Precedent</button>
            <button onClick={() => setEpisodeNumber(episodeNumber + 1)}>Suivant</button>
            <button onClick={playFunction}>Play</button>
        </div>
    )
}