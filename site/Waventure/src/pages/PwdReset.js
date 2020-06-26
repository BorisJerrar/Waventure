import React, { useState } from "react";
import axios from 'axios';
import { Link } from 'react-router-dom'
import "../style/LoginForm.css"

function PwdReset(props) {
    const pathLogo = process.env.REACT_APP_STATIC_IMG_PATH;
    const [email, setEmail] = useState("");

    function SendEmail() {
        axios.post('http://localhost:4000/auth/pwdReset', {
            email: email,
        })
            .then(function (response) {
                console.log(JSON.stringify(response.data))
            }
            )
            .catch(function (error) {
                console.log(error);
            })
    }

    function handleSubmit(event) {
        event.preventDefault();
    }

    return (
        <div className="bg-container">
            <main className="home sign-in">
                <div className="waventureLogo">
                    <img src={`${pathLogo}/waventureLogo.svg`} alt="Waventure Logo" />
                    <h1 className="logo-txt">WAVENTURE</h1>
                </div>
                <form className="login-box"
                    onSubmit={handleSubmit}>
                    <div className="user-box">
                        <input
                            type="email"
                            id="email"
                            placeholder="Email"
                            value={email}
                            onChange={e => {
                                setEmail(e.target.value);
                            }}
                        />
                        <button
                            className="btn-base"
                            type="submit"
                            onClick={SendEmail}
                        >
                           Réinitialiser 
                    </button>
                        <div className="form-aside">
                            <p>Pas encore de compte ?</p>
                            <Link className="link-form" to="/signUp">S'inscrire</Link>
                        </div>
                    </div>
                </form>
            </main>
        </div>
    )
}

export default PwdReset; 