import React, {useState} from 'react';
import axios from 'axios';

function Reset(props) {
    const pathLogo = process.env.REACT_APP_STATIC_IMG_PATH
    const url = window.location.pathname.split('/')
    const token = url[2]
    const [password, setPassword] = useState("")
    const [passwordConfirmation, setPasswordConfirmation] = useState("")

    const sendNewPassword = () => {
        if (password.length && passwordConfirmation.length) {

            var data = JSON.stringify({"password": password});
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
                    console.log(JSON.stringify(response.data));
                    window.location.href="/signIn" 
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password === passwordConfirmation) {
            sendNewPassword()
        } else {
            console.log('Passwords do not match');
        }
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
                    <div className="user-box">
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
        </div>
    )
}

export default Reset;