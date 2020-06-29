import React, { useContext } from 'react'
import Context from '../context/context'

export default function MainPlayerImg({episodeInfos,reducer}) {
  const {serverPath} = useContext(Context)
    return (
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
    )
}
