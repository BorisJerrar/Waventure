import React, { useState } from "react";
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom'
import "../style/LoginForm.css"

function SignIn(props) {
    const pathLogo = process.env.REACT_APP_STATIC_IMG_PATH;
    const pathAvatar = process.env.REACT_APP_DYNAMIC_IMG_PATH

    const [isLoggedIn, setLoggedIn] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [token, setToken] = useState();

    function checkLogin() {
        axios.post('http://localhost:4000/auth/signin', {
            email: email,
            password: password
        })
            .then(function (response) {
                console.log(JSON.stringify(response.data))
                setToken(response.data.token)
                setLoggedIn(true)
                console.log(token)
            }
            )
            .catch(function (error) {
                console.log(error);
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
        <div>
            <div className="wrap-bg">

                <div className="bg-container"></div>
            </div>


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
                            <Link className="link-form" to="/pwdReset">Réinitialiser</Link>
                        </div>
                    </div>
                </form>
            </main>
            </div>
    )
}

export default SignIn;