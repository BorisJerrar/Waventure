import React from 'react'
import "../style/Categorie.css";

export default function CategorySynopsis({ellement, visibilityProps, classname}) {
    return (
        <p
        className={classname}
        style={
          visibilityProps
            ? { visibility: "visible" }
            : { visibility: "hidden" }
        }
      >
        {ellement}
      </p>
    )
}
