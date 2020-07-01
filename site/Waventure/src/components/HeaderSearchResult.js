import React, {useContext} from 'react'
import Context from '../context/context'
import {Link} from 'react-router-dom'

export default function HeaderSearchResult({handleSearch, resultSearch}) {
    const { toggle } = useContext(Context)  
    const pathAvar = process.env.REACT_APP_DYNAMIC_IMG_PATH;
    
    return (
        <div className="searchFetch" style={toggle ? { display: "block" } : { display: "none" }}>
  
        {resultSearch.map((each, key) => {
          return (
            <Link onClick={() => handleSearch(each.lower)} key={key} to="/search" style={{ textDecoration: "none", color: "white" }}>
              <div className="eachSearch">
                <img className="eachImage" src={`${pathAvar}/${each.image}`} alt="" />
                <p className="eachTitle">{each.title}</p>
              </div>
            </Link>
          )
        })}

      </div>
    )
}
