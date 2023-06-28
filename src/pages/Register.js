import React, {useState} from 'react';
import axios from "axios";
import {Link} from "react-router-dom";

function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');

    const [error, toggleError] = useState(false);
    const [loading, toggleLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        toggleError(false);
        toggleLoading(true);

        try {
            const res = await axios.post('https://frontend-educational-backend.herokuapp.com/api/auth/signup', {
                email: email,
                password: password,
                username: username,
                role: ["user"]
            });
            console.log("Gebruiker succesvol geregistreerd met de volgende gegevens:");
            console.log("Email: " + email);
            console.log("Username: " + username);
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
                           autoComplete="off"/>
                </div>
                <div>
                    <label htmlFor="email-field">Email:</label>
                    <input id="email-field" type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                           autoComplete="off"/>
                </div>
                <div>
                    <label htmlFor="password-field">Wachtwoord:</label>
                    <input id="password-field" name="password" value={password} onChange={(e) => setPassword(e.target.value)}
                           autoComplete="off"/>
                </div>
                {error && <p className="error">Dit account bestaat al. Probeer een ander emailadres.</p>}
                <button type="submit">Registreren</button>
            </form>
            <p>Heb je al een account? Je kunt je <Link to="/login">hier</Link> inloggen.</p>
        </main>
    );
}

export default Register;