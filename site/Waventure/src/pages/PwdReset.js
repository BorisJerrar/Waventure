import React, { useState } from "react";
import axios from 'axios';
import { Link } from 'react-router-dom'
import "../style/LoginForm.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function PwdReset(props) {
    const pathLogo = process.env.REACT_APP_STATIC_IMG_PATH;
    const [email, setEmail] = useState("");
    const [isError, setIsError] = useState(false);
    const [messageError, setMessageError] = useState("")
    const [success, setSuccess] = useState(false);
    const [messageSuccess, setMessageSuccess] = useState("")

    function SendEmail() {
        if (!success){
        axios.post('http://localhost:4000/auth/pwdReset', {
            email: email,
        })
            .then(function (response) {
                setSuccess(true)
                setIsError(false)
                setMessageSuccess(response.data.message)
            }
            )
            .catch(function (error) {
                setIsError(true)
                setMessageError(error.response.data.error)
            })
        }
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