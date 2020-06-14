import React, { useState } from "react";
import axios from 'axios';
import { Link } from 'react-router-dom';

function SignUp(props) {

    const [state, setState] = useState({
        email : "",
        password : "",
        passwordConfirmation : "",
        username : "",
        first_name : "",
        last_name : "",
        birth_date : ""
    })

    const handleChange = (e) => {
        const {id, value} = e.target
        setState(prevState => ({
            ...prevState,
            [id] : value
        }))
    }

    const handleSubmitClick = (e) => {
        e.preventDefault();
        if(state.password === state.passwordConfirmation) {
            sendToServer()
        } else {
            console.log('Passwords do not match');
        }
    }

    const sendToServer = () => {
        if(state.email.length && state.password.length && state.username.length && state.first_name.length && state.last_name.length && state.birth_date.length ) {
            console.log("password match");
            const payload={
                "username":state.username,
                "first_name":state.first_name,
                "last_name":state.last_name,
                "email":state.email,
                "birth_date":state.birth_date,
                "password":state.password,
            }
            console.log(payload)
            axios.post('http://localhost:4000/account', payload)
                .then(function (response) {
                    if (response.data.code === 201) {
                        console.log(response)

                    } else {
                        console.log(response)
                    }
                })
                .catch(function(error) {
                    console.log(error);
                })
       }
    }

        return(
        <form className="sign-up-form">
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
            <Link to="/signIn">J'ai déjà un compte</Link>
            <button
                type="submit"
                onClick={handleSubmitClick}
            >
                <Link to="/main" style={{textDecoration: 'none', color: "red"}}>
                    S'inscrire
                </Link>
            </button>
        </form>

    )
}

export default SignUp;