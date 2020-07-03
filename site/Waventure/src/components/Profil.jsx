import React, { useState, useContext } from 'react'
import MainProfilInfo from './MainInfoProfil'
import "../style/profil.css";
import { Link } from 'react-router-dom'
import Context from '../context/context'
import axios from 'axios'

export default function Profil() {

    const {serverPath, token} = useContext(Context);
    const [toggleDelete, setToggleDelete] = useState(false);

    const config = {
        method: 'DELETE',
        url: `${serverPath}/account`,
        headers: {
            'x-access-token': token
        },

    }

    const deleteAccount = () => {
        axios(config).then((res) => {
            if (res.status === 200) {
                localStorage.removeItem('token')
               window.location.href = "/signUp"
            }
        })

    }

    return (
        <div className="bodyProfil">
            <MainProfilInfo
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
