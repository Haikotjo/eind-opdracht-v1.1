import React, { useContext, useState } from 'react';
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { Link } from "react-router-dom";
import styles from './LoginPage.module.scss';

function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null)
    const { login } = useContext(AuthContext)

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(false)

        try {
            const res = await axios.post('https://frontend-educational-backend.herokuapp.com/api/auth/signin', {
                username: username,
                password: password,
            });
            console.log(res.data)
            login(res.data.accessToken, '/profile');
        } catch (e) {
            console.log("Onjuiste email en wachtwoord combinatie", e)
            setError(true)
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
                    {error && <p className={styles["login-page__error"]}>Error Onjuiste aanmeldgegevens.</p>}
                    <p className={styles["login-page__register-link"]}>Heb je nog geen account? <Link to="/register">Registreer</Link> je dan eerst.</p>
                    <button type="submit" className={styles["login-page__submit-btn"]}>Login</button>
                </form>
            </div>
        </div>
    );
}

export default LoginPage;
