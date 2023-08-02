import React, { useContext, useState } from 'react';
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { Link } from "react-router-dom";
import styles from './LoginPage.module.scss';
import StandardButton from "../../components/buttons/standardButton/StandardButton";
import { handleError } from "../../helpers/handleError";

function LoginPage() {
    const [username, setUsername] = useState(""); // State for the username
    const [password, setPassword] = useState(""); // State for the password
    const [error, setError] = useState(null) // State for managing errors
    const { login } = useContext(AuthContext) // Get the login function from AuthContext

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(false)
        try {
            // Try to log in the user
            const res = await axios.post('https://frontend-educational-backend.herokuapp.com/api/auth/signin', {
                username: username,
                password: password,
            });
            console.log(res.data)
            login(res.data.accessToken, '/profile'); // If login is successful, redirect the user to the profile page
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
                        <label>
                            Username
                            <input
                                className={styles["login-page__input"]}
                                placeholder="Username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </label>
                        <label>
                            Password
                            <input
                                type="password"
                                className={styles["login-page__input"]}
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </label>
                    </div>
                    {error && <p className={styles["login-page__error"]}>{error}</p>}
                    <StandardButton type="submit"
                                    className={styles["login-page__submit-button"]}
                    >Login</StandardButton>
                    <p className={styles["login-page__login-text"]}>Don't have an account? <Link  to="/register" className={styles["login-page__register-link"]}>Register</Link> first.</p>
                </form>
            </div>
        </div>
    );
}

export default LoginPage;
