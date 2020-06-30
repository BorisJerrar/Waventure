import React, { useContext } from 'react'
import Context from '../context/context'
import {Link} from 'react-router-dom'

export default function HeaderMenu({avatar, accountTrigger, logout, pathImg, pathAvar}) {
        const { user } = useContext(Context)   

    return (
        <div className="profilIcon" onClick={avatar}>
        <img className="firstArrow" src={`${pathImg}/arrow.svg`} alt="Arrow Icon" />
        <div className="avatarBox">
          <img src={`${pathAvar}/Avatar0${user && user[0] && user[0].avatar_id? user[0].avatar_id : "1"}.jpg`} alt="Profil Icon" />
          {accountTrigger ? (
            <div className="accountRolling">
              <Link to="/profil" className="categoriesParagraph">
                <p
                  className="categoriesParagraph"
                  style={{ padding: "8px", display: "block" }}
                >
                  Profil
            </p>
              </Link>
              <Link to="/contact" className="categoriesParagraph">
                <p
                  className="categoriesParagraph"
                  style={{ padding: "8px", display: "block" }}
                >
                  Contacter Waventure
            </p>
              </Link>
              <p
                className="categoriesParagraph"
                style={{ padding: "8px", display: "block" }}
                onClick={logout}
              >
                Se déconnecter
              </p>
            </div>
          ) : (
              ""
            )}
        </div>
      </div>
    )
}
