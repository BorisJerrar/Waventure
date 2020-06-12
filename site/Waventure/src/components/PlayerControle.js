import React from 'react'
import "../style/PlayerControle.css";


export default function PlayerControle({playing, setPlaying, index, setIndex}) {
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
    const playSaga = () => {
        setPlaying(!playing)

    }
    return (
        <div className='controller'>
            <img onClick={prevSaga} src='./img/prev.svg' alt='test'/>
            <img onClick={playSaga} src={playing?'./img/pause.svg':'./img/next.svg'} alt='test'/>
            <img onClick={nextSaga} src='./img/next.svg' alt='test'/>
        </div>
    )
}
