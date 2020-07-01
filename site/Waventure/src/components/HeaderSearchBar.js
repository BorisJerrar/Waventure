import React, {useContext, useState, useRef} from 'react'
import {Link} from 'react-router-dom'
import Context from '../context/context'
import HeaderSearchResult from './HeaderSearchResult'

export default function HeaderSearchBar({handleSearch}) {

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
            <HeaderSearchResult
            handleSearch={handleSearch}
            resultSearch={resultSearch}
            />
          </div>
    )
}
