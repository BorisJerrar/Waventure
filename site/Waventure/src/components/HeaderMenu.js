import React, { useContext } from 'react'
import Context from '../context/context'
import {Link} from 'react-router-dom'
import {Redirect} from 'react-router-dom'

export default function HeaderMenu({ pathAvar}) {
        const { user, accountTrigger, setAccountTriggerTrigger, imagePath} = useContext(Context)   

        const avatar = async () => {
          setAccountTriggerTrigger(!accountTrigger);
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
          <img className="avatarImg" src={`${pathAvar}/Avatar${user && user[0] && user[0].avatar_id? user[0].avatar_id : "1"}.jpg`} alt="Profil Icon" />
          {accountTrigger ? (
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
