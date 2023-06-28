import React, {useContext, useState} from 'react';
import {AuthContext} from "../context/AuthContext";
import axios from "axios";
import {Link} from "react-router-dom";

function LoginPage() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null)
    const {login} = useContext(AuthContext)

     const handleSubmit = async (e) => {
        e.preventDefault();
        setError(false)

        try {
            const res = await axios.post ('https://frontend-educational-backend.herokuapp.com/api/auth/signin', {
                username: username,
                password: password,
            });
            console.log(res.data)
            login(res.data.accessToken, '/profile');
        }catch (e) {
            console.log("Onuist email en wachtwoord combinatie". e)
            setError(true)
        }
    }

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username-field">Gebruikersnaam:</label>
                    <input id="username-field" type="text" value={username} onChange={(e) => setUsername(e.target.value)}
                           autoComplete="off"/>
                </div>
                <div>
                    <label htmlFor="password-field">Wachtwoord</label>
                    <input id="password-field" name="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                </div>
                {error && <p> Error Onuist email en wachtwoord combinatie</p> }
                <button type="submit">Login</button>
            </form>
            <p>Heb je nog geen account? <Link to="/register">Registreer</Link> je dan eerst.</p>
        </div>
    );
}

export default LoginPage;