import React from 'react'
import {Link} from 'react-router-dom'
import HeaderLogo from './HeaderLogo'
import HeaderSearchBar from './HeaderSearchBar'
import HeaderCategories from './HeaderCategories'
import HeaderMenu from './HeaderMenu'


export default function HeaderContent({refSearch,
    showSearch,
    getInput,
    search,
    handleSearch,
    toggle,
    resultSearch,
    showCategories,
    categories,
    categoriesTrigger,
    avatar,
    accountTrigger,
    logout}) {
        
    const pathImg = process.env.REACT_APP_STATIC_IMG_PATH;
    const pathAvar = process.env.REACT_APP_DYNAMIC_IMG_PATH;
    return (
        <header>
        <div className="leftHeaderSide">
          <HeaderLogo
            pathImg={pathImg}
          />
          <HeaderSearchBar
          refSearch={refSearch}
          showSearch={showSearch}
          getInput={getInput}
          search={search}
          handleSearch={handleSearch}
          toggle={toggle}
          resultSearch={resultSearch}
          pathImg={pathImg}
          pathAvar={pathAvar}
          />
          <nav>
            <ul>
              <HeaderCategories
              showCategories={showCategories}
              categories={categories}
              categoriesTrigger={categoriesTrigger}
              pathImg={pathImg}
              />
              <li><Link to='/newest' className='newestLink'>Nouveautés</Link></li>
              <li><Link to='/favorite' className='newestLink'>Coup de coeur</Link></li>
            </ul>
          </nav>
        </div>
        <HeaderMenu
         avatar={avatar}
         accountTrigger={accountTrigger}
         logout={logout}
         pathImg={pathImg}
         pathAvar={pathAvar}
        />
      </header>
    )
}
