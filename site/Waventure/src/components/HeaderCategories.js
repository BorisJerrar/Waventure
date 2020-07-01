import React from 'react'
import {Link} from 'react-router-dom'

export default function HeaderCategories({
  showCategories,
    categories,
    categoriesTrigger,
    pathImg
}) {
    return (
        <li className="category" onClick={showCategories}>
        Categories
        <i>
          <img
            src={`${pathImg}/arrow.svg`}
            alt="Arrow Icon"
            className="arrowCategories"
          />
        </i>
        <div className="categoriesFetch">
          {categoriesTrigger
            ? categories.map((each, key) => {
              return (
                <Link to={`/${each.name}`}
                  key={key}
                  className="categoriesParagraph"
                  style={
                    categoriesTrigger
                      ? { opacity: 1, padding: "8px", visibility: "visible" }
                      : { visibility: "hidden", opacity: 0 }
                  }
                >
                  {each.name}
                </Link>
              );
            })
            : ""}
        </div>
      </li>
    )
}
