import React, {useState} from "react"
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';

function LoginForm(props) {
    const [isLoggedIn, setLoggedIn] = useState(false);
    const [isError, setIsError] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function checkLogin() {
        axios.post("http://localhost:4000/Auth/login", {
            email,
            password
        }).then(result => {
            if (result.status === 200) {
                setLoggedIn(true);
            } else {
                setIsError(true);
            }
        }).catch(e => {
            setIsError(true);
        })
    }

    if (isLoggedIn) {
        return <Redirect to="/main" />;
    }

    return(
        <form className="LoginForm">
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
            <Link to="/registration">S'inscrire</Link>
            <button
                type="submit"
                onClick={checkLogin}
            >
                    S'identifier
            </button>
        </form>

    )
}

export default LoginForm;