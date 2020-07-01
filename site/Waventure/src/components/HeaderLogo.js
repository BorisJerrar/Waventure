import React, {useContext} from 'react'
import {Link} from 'react-router-dom'
import Context from '../context/context'

export default function HeaderLogo({pathImg}) {
    const { imagePath } = useContext(Context)  

    return (
        <div className="waventureLogoHeader">
            <Link to="/main" className="LinkHome">Logo Cliquable</Link>
            <img src={`${imagePath}/waventureLogo.svg`} alt="Waventure Logo" />
            <h1>WAVENTURE</h1>
        </div>
    )
}
