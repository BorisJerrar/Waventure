import React, {useContext, useState, useRef} from 'react'
import {Link} from 'react-router-dom'
import Context from '../context/context'

export default function HeaderSearchBar({
    handleSearch,
    toggle,
    pathAvar}) {

      const { serverPath, imagePath, setToggle } = useContext(Context)
      const [search, setSearch] = useState('')
      const [resultSearch, setResultSearch] = useState([])
      const refSearch = useRef(null)

      
      const fetchSearchSeries = async (e) => {
        let userSearch = refSearch.current.value
        const response = await fetch(`${serverPath}/serie?search=%${userSearch}%`)
        const data = await response.json()
        setResultSearch(data)
      }

      const showSearch = (e) => {
        if (e.target.value !== "") {
          setToggle(true)
        }
      }
    
      const getInput = (e) => {
        if (e.target.value !== "") {
          setToggle(true)
        } else {
          setToggle(false)
        }
        setSearch(e.target.value)
        fetchSearchSeries(e)
      }


    return (
        <div className="searchingBar">
            <input ref={refSearch} onClick={showSearch} placeholder="Recherche" onChange={getInput} value={search} />
            <Link onClick={() => handleSearch(search)} to="/search" className="buttonSearch">
              <button>
                <img src={`${imagePath}/loupe.svg`} alt="Searching Logo" />
              </button>
            </Link>
  
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
          </div>
    )
}
