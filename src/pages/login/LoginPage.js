import React, { useContext, useState } from 'react';
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { Link } from "react-router-dom";
import styles from './LoginPage.module.scss';
import StandardButton from "../../components/buttons/standardButton/StandardButton";
import {handleError} from "../../helpers/handleError";

function LoginPage() {
    const [username, setUsername] = useState(""); // State voor de gebruikersnaam
    const [password, setPassword] = useState(""); // State voor het wachtwoord
    const [error, setError] = useState(null) // State voor het beheren van fouten
    const { login } = useContext(AuthContext) // Haal de login-functie uit de AuthContext

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(false)
        try {
            // Probeer de gebruiker in te loggen
            const res = await axios.post('https://frontend-educational-backend.herokuapp.com/api/auth/signin', {
                username: username,
                password: password,
            });
            console.log(res.data)
            login(res.data.accessToken, '/profile'); // Bij succesvolle login, stuur de gebruiker naar de profielpagina
        } catch (e) {
            handleError(e);
            setError(e.toString());
        }
    }

    return (
        <div className={styles["login-page"]}>
            <div className={styles["login-page__form"]}>
                <h2 className={styles["login-page__title"]}>Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className={styles["input-group"]}>
                        <input
                            className={styles["login-page__input"]}
                            placeholder="Gebruikersnaam"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <input
                            type="password"
                            className={styles["login-page__input"]}
                            placeholder="Wachtwoord"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    {error && <p className={styles["login-page__error"]}>{error}</p>}
                    <p >Heb je nog geen account? <Link  to="/register" className={styles["login-page__register-link"]}>Registreer</Link> je dan eerst.</p>
                    <StandardButton type="submit">Login</StandardButton>
                </form>
            </div>
        </div>
    );
}

export default LoginPage;
