import React, { useState } from 'react';
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import styles from './Register.module.scss';

function RegisterPage() {
    const navigate = useNavigate();

    // Initialiseren van state variabelen
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
    });

    const handleSubmit = async (event) => {
        event.preventDefault(); // Standaard form verzending voorkomen

        setError(null); // Reset de error state
        setLoading(true); // Zet loading op true tijdens het verzenden van data

        try {
            // Versturen van POST request naar het backend
            const res = await axios.post('https://frontend-educational-backend.herokuapp.com/api/auth/signup', {
                email: formData.email,
                password: formData.password,
                username: formData.username,
                role: ["user"]
            });
            console.log("Gebruiker succesvol geregistreerd met e-mail: " + formData.email + " Gebruikersnaam: " + formData.username);
            navigate('/profile'); // Navigeer naar de profielpagina na succesvolle registratie
        } catch (e) {
            console.error("Registratie mislukt!!! ⛔", e);
            setError(e.response.data.message || e.message); // Toon de error bericht van de response, indien beschikbaar
        }
        setLoading(false); // Zet loading op false na het verzenden van data
    }

    const handleInputChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value }); // Update de form data state wanneer input verandert
    };

    return (
        <div className={styles["register-page"]}>
            <form onSubmit={handleSubmit} className={styles["register-page__form"]}>
                <h2>Register</h2>
                {error && <div className={styles["alert"]}>{error}</div>} {/* Toon het error bericht als er een error is */}
                <label>
                    Username
                    <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleInputChange}
                        required
                    />
                </label>
                <label>
                    Email
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                    />
                </label>
                <label>
                    Password
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        required
                        minLength="6"
                    />
                </label>
                <button type="submit" disabled={loading}>
                    {loading ? 'Loading...' : 'Register'}
                </button>
                <p>Heb je al een account? Je kunt <Link to="/login">hier inloggen</Link>.</p>
            </form>
        </div>
    );
}

export default RegisterPage;