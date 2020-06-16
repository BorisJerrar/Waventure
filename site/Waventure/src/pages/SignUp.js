import React, { useState } from "react";
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';
import "../style/SignUp.css"

function SignUp(props) {
    const pathLogo = process.env.REACT_APP_STATIC_IMG_PATH

    const [state, setState] = useState({
        email: "",
        password: "",
        passwordConfirmation: "",
        username: "",
        first_name: "",
        last_name: "",
        birth_date: ""
    })
    const [token, setToken] = useState();
    const [isLoggedIn, setLoggedIn] = useState(false);

    function handleSubmit(event) {
        event.preventDefault();
    }

    const handleChange = (e) => {
        const { id, value } = e.target
        setState(prevState => ({
            ...prevState,
            [id]: value
        }))
    }

    const handleSubmitClick = (e) => {
        e.preventDefault();
        if (state.password === state.passwordConfirmation) {
            sendToServer()
        } else {
            console.log('Passwords do not match');
        }
    }


    const sendToServer = () => {
        if (state.email.length && state.password.length && state.username.length && state.first_name.length && state.last_name.length && state.birth_date.length) {
            const payload = {
                "username": state.username,
                "first_name": state.first_name,
                "last_name": state.last_name,
                "email": state.email,
                "birth_date": state.birth_date,
                "password": state.password,
            }
            axios.post('http://localhost:4000/auth/signup', payload)
                .then(function (response) {
                    console.log(JSON.stringify(response.data))
                    setToken(response.data.token)
                    setLoggedIn(true)
                    console.log(token)

                })
                .catch(function (error) {
                    console.log(error);
                })
        }
    }

    if (isLoggedIn) {
        return <Redirect to="/main" />;
    }

    return (
        <main>
            <div className="waventureLogo">
                <img src={`${pathLogo}/waventureLogo.svg`} alt="Waventure Logo" />
                <h1>WAVENTURE</h1>
            </div>
            <form className="login-box"
                onSubmit={handleSubmit}>
                <div className="user-box">
                    <input type="email"
                        id="email"
                        placeholder="Email"
                        value={state.email}
                        onChange={handleChange}
                    />
                    <input type="password"
                        id="password"
                        placeholder="Mot de Passe"
                        value={state.password}
                        onChange={handleChange}
                    />
                    <input type="password"
                        id="passwordConfirmation"
                        placeholder="Confirmation du Mot de Passe"
                        value={state.passwordConfirmation}
                        onChange={handleChange}
                    />
                    <input type="username"
                        id="username"
                        placeholder="username"
                        value={state.username}
                        onChange={handleChange}
                    />
                    <input type="first_name"
                        id="first_name"
                        placeholder="prenom"
                        onChange={handleChange}
                    />
                    <input type="last_name"
                        id="last_name"
                        placeholder="Nom"
                        value={state.last_name}
                        onChange={handleChange}
                    />
                    <input type="birth_date"
                        id="birth_date"
                        placeholder="Date de naissance"
                        value={state.birth_date}
                        onChange={handleChange}
                    />
                    <div className="form-aside">
                        <Link className="link-form" to="/signIn">J'ai déjà un compte</Link>
                        <button
                            className="btn-base"
                            type="submit"
                            onClick={handleSubmitClick}
                        >
                            S'inscrire
                        </button>
                    </div>
                </div>
            </form>
        </main>
    )
}

export default SignUp;