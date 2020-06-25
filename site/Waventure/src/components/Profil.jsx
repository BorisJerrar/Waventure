import React, { useState } from 'react'
import MainProfilInfo from './MainInfoProfil'
import "../style/profil.css";
import { Link } from 'react-router-dom'

export default function Profil({ user, account }) {
    const [toggleDelete, setToggleDelete] = useState(false)
    const server = process.env.REACT_APP_SERVER_PATH;

    const deleteAccount = () => {
        fetch(`${server}/account/${user[0].account_id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        }).then((res) => {
            if (res.status === 200) {
                localStorage.removeItem('token')
               window.location.href = "/signUp"
            }
        })
    }

    return (
        <div className="bodyProfil">
            <MainProfilInfo
                user={user}
                justify={"flex-start"}
            />
            <Link to="/profilUpdate" style={{ textDecoration: "none" }}>
                <button className="btnProfil">Modifier Mon Profil</button>
            </Link>
            <h5>Mot de Passe</h5>

            <Link to="/passwordUpdate" style={{textDecoration: "none"}}>
                <button className="btnProfil">Modifier Mon Mot de Passe</button>
            </Link>
            
            <h5>Compte</h5>
            <button className="btnProfil" onClick={() => setToggleDelete(!toggleDelete)}>Supprimer mon compte</button>
            <div className="deleteProfil" style={toggleDelete ? { visibility: "visible" } : { visibility: "hidden" }}>
                <div>
                    <p>Etes vous sur de vouloir supprimer votre profil ?</p>
                    <p>Une fois supprimé, vous n'aurez aucun moyen de le récupérer</p>
                    <div>
                        <button className="btnProfil" onClick={deleteAccount}>Oui</button>
                        <button className="btnProfil" onClick={() => setToggleDelete(!toggleDelete)}>Non</button>
                    </div>

                </div>
            </div>

        </div>


    )
}
