import React from 'react'
import "../style/Categorie.css";

export default function CategorySynopsis({ellement, visibilityProps, classname}) {
    return (
        <p
        className={classname}
        style={
          visibilityProps
            ? { visibility: "visible", transform: 'opacity(1)' }
            : { visibility: "hidden", transform: 'opacity(0)'}
        }
      >
        {ellement}
      </p>
    )
}
