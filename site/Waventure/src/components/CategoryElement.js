import React from 'react'
import "../style/Categorie.css";

export default function CategorySynopsis({ellement, visibilityProps, classname, addingClass}) {
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
