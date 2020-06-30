import React from 'react'
import {Link} from 'react-router-dom'

export default function HeaderLogo({pathImg}) {
    return (
        <div className="waventureLogoHeader">
            <Link to="/main" className="LinkHome">Logo Cliquable</Link>
            <img src={`${pathImg}/waventureLogo.svg`} alt="Waventure Logo" />
            <h1>WAVENTURE</h1>
        </div>
    )
}
