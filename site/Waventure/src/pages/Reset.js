import React, { useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Reset(props) {
    const pathLogo = process.env.REACT_APP_STATIC_IMG_PATH
    const url = window.location.pathname.split('/')
    const token = url[2]
    localStorage.setItem('token', token)
    const [password, setPassword] = useState("")
    const [passwordConfirmation, setPasswordConfirmation] = useState("")
    const [isError, setIsError] = useState(false);
    const [messageError, setMessageError] = useState("")
    const [success, setSuccess] = useState(false);
    const [messageSuccess, setMessageSuccess] = useState("")


    const sendNewPassword = () => {
        if (password.length && passwordConfirmation.length && !success) {

            var data = JSON.stringify({ "password": password });
            var config = {
                method: 'put',
                url: 'http://localhost:4000/auth/reset',
                headers: {
                    'x-access-token': token,
                    'Content-Type': 'application/json'
                },
                data: data
            };
            axios(config)
                .then(function (response) {
                    setSuccess(true)
                    setIsError(false)
                    setMessageSuccess(response.data.message)
                    localStorage.clear('token')
                    window.location.href = "/signIn"
                })
                .catch(function (error) {
                    setIsError(true)
                    setSuccess(false)
                    setMessageError(error.response.data.error)
                });
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password === passwordConfirmation) {
            sendNewPassword()
        } else {
            setIsError(true)
            setMessageError('Mot de passe incorect')
        }
    }

    if (!localStorage.token) {
    }

    return (
        <div className="bg-container">
            <main className="home sign-in">
                <div className="waventureLogo">
                    <img src={`${pathLogo}/waventureLogo.svg`} alt="Waventure Logo" />
                    <h1 className="logo-txt">WAVENTURE</h1>
                </div>
                <form className="login-box"
                >
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
                    {success && (
                        <div className="success-msg">
                            <FontAwesomeIcon
                                className="success-circle"
                                icon={['fas', 'check-circle']} size="sm" />
                            <div>
                                {messageSuccess}
                            </div>
                        </div>
                    )}
                    < div className="user-box">
                        <input type="password"
                            id="password"
                            placeholder="Mot de Passe"
                            value={password}
                            onChange={e => {
                                setPassword(e.target.value);
                            }}
                        />
                        <input
                            type="password"
                            id="passwordConfirmation"
                            placeholder="Confirmer mot de passe"
                            value={passwordConfirmation}
                            onChange={e => {
                                setPasswordConfirmation(e.target.value);
                            }}
                        />
                        <button
                            className="btn-base"
                            type="submit"
                            onClick={handleSubmit}
                        >
                            Valider
                    </button>
                    </div>
                </form>
            </main>
        </div >
    )
}

export default Reset;