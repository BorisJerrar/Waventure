import React from 'react'
import {Link} from 'react-router-dom'

export default function HeaderSearchBar({refSearch,
    showSearch,
    getInput,
    search,
    handleSearch,
    toggle,
    resultSearch,
    pathImg,
    pathAvar}) {
    return (
        <div className="searchingBar">
            <input ref={refSearch} onClick={showSearch} placeholder="Recherche" onChange={getInput} value={search} />
            <Link onClick={() => handleSearch(search)} to="/search" className="buttonSearch">
              <button>
                <img src={`${pathImg}/loupe.svg`} alt="Searching Logo" />
              </button>
            </Link>
  
            <div className="searchFetch" style={toggle ? { display: "block" } : { display: "none" }}>
  
              {resultSearch.map((each, key) => {
                return (
                  <Link onClick={() => handleSearch(each.lower)} key={key} to="/search" style={{ textDecoration: "none", color: "white" }}>
                    <div className="eachSearch">
                      <img className="eachImage" src={`${pathAvar}/${each.image}`} alt="" />
                      <p className="eachTitle">{each.lower}</p>
                    </div>
                  </Link>
                )
              })}
  
            </div>
          </div>
    )
}
