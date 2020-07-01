import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';
import "../style/LoginForm.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function SignUp(props) {
    const pathLogo = process.env.REACT_APP_STATIC_IMG_PATH;
    const pathAvatar = process.env.REACT_APP_DYNAMIC_IMG_PATH;
    const serveurPath = process.env.REACT_APP_SERVER_PATH

    const [state, setState] = useState({
        email: "",
        password: "",
        passwordConfirmation: "",
        username: "",
        first_name: "",
        last_name: "",
        birth_date: "",
        avatar_id: "1",
    })
    const [token, setToken] = useState();
    const [isLoggedIn, setLoggedIn] = useState(false);
    const [avatarFormTrigger, setAvatarFormTrigger] = useState(false)
    const [avatar, setAvatar] = useState([]);
    const [selectedAvatar, setSelectedAvatar] = useState("Avatar01.jpg")
    const [isError, setIsError] = useState(false);
    const [messageError, setMessageError] = useState("")

    useEffect(() => {
        const fetching = async () => {
            const data = await fetch(`${serveurPath}/avatar`);
            const json = await data.json();
            setAvatar(json);
        }
        if (avatarFormTrigger) {
            fetching()
        }
    }, [avatarFormTrigger, serveurPath, avatar])


    const handleSubmit = (e) => {
        e.preventDefault();
    }

    const handleChange = (e) => {
        const { id, value } = e.target
        setState({
            ...state,
            [id]: value
        })
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
        const payload = {
            "username": state.username,
            "first_name": state.first_name,
            "last_name": state.last_name,
            "email": state.email,
            "birth_date": state.birth_date,
            "avatar_id": state.avatar_id,
            "password": state.password,
        }
        axios.post('http://localhost:4000/auth/signup', payload)
            .then(function (response) {
                setToken(response.data.token)
                setLoggedIn(true)
            })
            .catch(function (error) {
                setIsError(true)
                setMessageError(error.response.data.error)
            })
    }

    if (isLoggedIn) {
        localStorage.setItem('token', token)
        return <Redirect to="/main" />;
    }

    const showAvatarForm = () => {
        setAvatarFormTrigger(!avatarFormTrigger)
    }
    const handleToggle = (key) => {
        setSelectedAvatar("Avatar" + (key + 1) + ".jpg")
        setAvatarFormTrigger(false)
        setState({
            ...state,
            'avatar_id': key + 1
        })
    }
    return (
        <div>
            <div className="wrap-bg">
                <div className="bg-container"></div>
            </div>
            <main className="home sign-up">
                <div className="waventureLogo">
                    <img src={`${pathLogo}/waventureLogo.svg`} alt="Waventure Logo" />
                    <h1 className="logo-txt">WAVENTURE</h1>
                </div>
                <form className="login-box"
                    onSubmit={handleSubmit}>
                    <div className="user-box">
                        <div className="avatar-box">
                            <img
                                className="profil-avatar"
                                src={`${pathAvatar}/${selectedAvatar}`}
                                alt="profil-icon"
                                onClick={showAvatarForm}
                            />
                            <div className="middle">
                                <div></div>
                            </div>
                        </div>
                        <div className="avatar-form">
                            {avatarFormTrigger
                                ? avatar.map((each, key) => {
                                    return (
                                        <img
                                            src={`${pathAvatar}/${each.avatar_path}`}
                                            key={key}
                                            value={each.avatar_path}
                                            className="profil-avatar"
                                            onClick={() => handleToggle(key)}
                                            alt="avatar"
                                        >
                                        </img>
                                    );
                                })
                                : ""}
                        </div>
                        {isError && (
                            <div className="error-msg">
                                <FontAwesomeIcon
                                    className="error-circle"
                                    icon={['fas', 'exclamation-circle']} size="sm" />
                                <div>
                                    {messageError}
                                </div>

                            </div>
                        )}
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
                        <input type="date"
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
        </div>
    )
}

export default SignUp;