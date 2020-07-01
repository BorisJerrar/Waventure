import React, {useContext} from 'react'
import {Link} from 'react-router-dom'
import Context from '../context/context'
import HeaderLogo from './HeaderLogo'
import HeaderSearchBar from './HeaderSearchBar'
import HeaderCategories from './HeaderCategories'
import HeaderMenu from './HeaderMenu'


export default function HeaderContent({handleSearch}) {
  
   const { toggle } = useContext(Context)  
    const pathAvar = process.env.REACT_APP_DYNAMIC_IMG_PATH;

    return (
        <header>
        <div className="leftHeaderSide">
          <HeaderLogo/>
          <HeaderSearchBar
          handleSearch={handleSearch}
          toggle={toggle}
          pathAvar={pathAvar}
          />
          <nav>
            <ul>
              <HeaderCategories/>
              <li><Link to='/newest' className='newestLink'>Nouveautés</Link></li>
              <li><Link to='/favorite' className='newestLink'>Coup de coeur</Link></li>
            </ul>
          </nav>
        </div>
        <HeaderMenu
         pathAvar={pathAvar}
        />
      </header>
    )
}
