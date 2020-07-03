import React from 'react'
import "../../style/Categorie.css";

export default function SlideShowElement({ellement, visibilityProps, classname }) {
    return (
        <p
        className={classname}
        style={
          visibilityProps
            ? { visibility: "visible", opacity : 1 }
            : { visibility: "hidden", opacity : 0 }
        }
      >
        {ellement}
      </p>
    )
}
