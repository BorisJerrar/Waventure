import React, { useState } from "react";
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom'
import "../style/LoginForm.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function SignIn(props) {
    const pathLogo = process.env.REACT_APP_STATIC_IMG_PATH;


    const [isLoggedIn, setLoggedIn] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [token, setToken] = useState();
    const [isError, setIsError] = useState(false);
    const [messageError, setMessageError] = useState("");

    function checkLogin() {
        axios.post('http://localhost:4000/auth/signin', {
            email: email,
            password: password
        })
            .then(function (response) {
                setToken(response.data.token)
                setLoggedIn(true)
            }
            )
            .catch(function (error) {
                setIsError(true)
                setMessageError(error.response.data.error)
            })
    }

    function handleSubmit(event) {
        event.preventDefault();
    }

    if (isLoggedIn) {
        localStorage.setItem('token', token)
        return <Redirect to="/main" />;
    }

    return (
        <div className="bg-container">
            <main className="home sign-in">
                <div className="waventureLogo">
                    <img src={`${pathLogo}/waventureLogo.svg`} alt="Waventure Logo" />
                    <h1>WAVENTURE</h1>
                </div>
                <form className="login-box"
                    onSubmit={handleSubmit}>
                    {isError && (
                        <div className="error-msg">
                            <FontAwesomeIcon
                                className="error-cross"
                                icon={['fas', 'times-circle']} size="sm" />
                            <div>
                                {messageError}
                            </div>

                        </div>
                    )}
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
                        <input type="password"
                            id="password"
                            placeholder="Mot de Passe"
                            value={password}
                            onChange={e => {
                                setPassword(e.target.value);
                            }}
                        />
                        <button
                            className="btn-base"
                            type="submit"
                            onClick={checkLogin}
                        >
                            S'identifier
                    </button>
                        <div className="form-aside">
                            <p>Pas encore de compte ?</p>
                            <Link className="link-form" to="/signUp">S'inscrire</Link>
                        </div>
                        <div className="form-aside">
                            <p>mot de passe oulié ?</p>
                            <Link className="link-form" to="/PwdReset">Réinitialiser</Link>
                        </div>

                    </div>
                </form>
            </main>
        </div>
    )
}

export default SignIn;