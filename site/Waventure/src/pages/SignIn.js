import React, { useState } from "react";
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom'
import "../style/SignIn.css"

function SignIn(props) {
    const pathLogo = process.env.REACT_APP_STATIC_IMG_PATH;

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
        return <Redirect to="/main" />;
    }

    return (
        <>
        <div className="waventureLogo">
            <a href="./">Logo Cliquable</a>
            <img src={`${pathLogo}/waventureLogo.svg`} alt="Waventure Logo" />
            <h1>WAVENTURE</h1>
        </div>
        <form className="sign-in-form"
            onSubmit={handleSubmit}>
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
            <Link to="/signUp">S'inscrire</Link>
            <button
                type="submit"
                onClick={checkLogin}
            >
                S'identifier
            </button>
        </form>
        </>
    )
}

export default SignIn;