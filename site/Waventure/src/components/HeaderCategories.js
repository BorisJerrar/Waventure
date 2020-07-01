import React, { useContext } from 'react'
import {Link} from 'react-router-dom'
import Context from '../context/context'

export default function HeaderCategories() {

  const { 
    categoriesTrigger, 
    setCategoriesTrigger, 
    categories, 
    imagePath
  } = useContext(Context)

  const showCategories = () => {
    setCategoriesTrigger(!categoriesTrigger);
  };

    return (
        <li className="category" onClick={showCategories}>
        Categories
        <i>
          <img
            src={`${imagePath}/arrow.svg`}
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
