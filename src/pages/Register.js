import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";

function Register() {
    const [email, setEmail] = useState('');
    const [emailValid, setEmailValid] = useState(false);
    const [password, setPassword] = useState('');
    const [passwordValid, setPasswordValid] = useState(false);
    const [username, setUsername] = useState('');

    const [error, toggleError] = useState(false);
    const [loading, toggleLoading] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
        setEmailValid(emailRegex.test(email));
    }, [email]);

    useEffect(() => {
        setPasswordValid(password.length >= 6);
    }, [password]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        toggleError(false);
        toggleLoading(true);

        if (!emailValid) {
            toggleError(true);
            console.error("Ongeldig emailadres ingevoerd.");
            return;
        }

        try {
            const res = await axios.post('https://frontend-educational-backend.herokuapp.com/api/auth/signup', {
                email: email,
                password: password,
                username: username,
                role: ["user"]
            });
            console.log("Gebruiker succesvol geregistreerd met de volgende gegevens: Email: " + email + " Username: " + username);
            navigate('/profile');
        } catch (e) {
            console.error("Registratie mislukt!!! ⛔", e)
            toggleError(true);
        }
        toggleLoading(false);
    }

    return (
        <main>
            <h2>Registreren</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username-field">Gebruikersnaam:</label>
                    <input id="username-field" type="text" value={username} onChange={(e) => setUsername(e.target.value)}
                           placeholder="username"
                           autoComplete="off"/>
                </div>
                <div>
                    <label htmlFor="email-field">Email:</label>
                    <input id="email-field" type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                           placeholder="example@domain.com"
                           autoComplete="off"/>
                    {email && (emailValid ? <span>✔️</span> : <span>Vul een geldig email in.</span>)}
                </div>
                <div>
                    <label htmlFor="password-field">Wachtwoord:</label>
                    <input id="password-field" name="password" value={password} onChange={(e) => setPassword(e.target.value)}
                           placeholder="minimaal 6 tekens"
                           autoComplete="off"/>
                    {password && (passwordValid ? <span>✔️</span> : <span>6 tekens.</span>)}
                </div>
                {error && <p className="error">Dit account bestaat al. Probeer een ander emailadres.</p>}
                <button type="submit">Registreren</button>
            </form>
            <p>Heb je al een account? Je kunt je <Link to="/login">hier</Link> inloggen.</p>
        </main>
    );
}

export default Register;