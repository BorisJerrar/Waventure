import React, { useContext } from 'react'
import Context from '../../context/context'
import {Link} from 'react-router-dom'
import {Redirect} from 'react-router-dom'

export default function HeaderMenu({ pathAvar}) {
        const { user, imagePath, headerTrigger, setHeaderTrigger} = useContext(Context)   

        const avatar = async () => {
          setHeaderTrigger({
            ...headerTrigger,
            menu: !headerTrigger.menu
          })
        };

        const logout = () => {
          localStorage.clear('token');
          if (!localStorage.getItem('token')) {
            return <Redirect to="/home" />
          }
        }

        const styleItem = {
          padding: "8px",
          display: "block"
        }

    return (
        <div className="profilIcon" onClick={avatar}>
        <img className="firstArrow" src={`${imagePath}/arrow.svg`} alt="Arrow Icon" />
        <div className="avatarBox">
          <img src={`${pathAvar}/Avatar${user && user[0] && user[0].avatar_id? user[0].avatar_id : "1"}.jpg`} alt="Profil Icon" />
          {headerTrigger.menu ? (
            <div className="accountRolling">
              <Link to="/profil" className="categoriesParagraph">
                <p
                  className="categoriesParagraph"
                  style={styleItem}
                >
                  Profil
            </p>
              </Link>
              <Link to="/contact" className="categoriesParagraph">
                <p
                  className="categoriesParagraph"
                  style={styleItem}
                >
                  Contacter Waventure
            </p>
              </Link>
              <p
                className="categoriesParagraph"
                style={styleItem}
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
