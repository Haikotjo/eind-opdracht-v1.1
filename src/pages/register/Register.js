import React, { useState } from 'react';
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import styles from './Register.module.scss';
import StandardButton from "../../components/buttons/standardButton/StandardButton";
import {handleError} from "../../helpers/handleError";

function RegisterPage() {
    const navigate = useNavigate();

    // Initialize state variables
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
    });

    const handleSubmit = async (event) => {
        event.preventDefault(); // Prevent default form submission

        setError(null); // Reset the error state
        setLoading(true); // Set loading to true while sending data

        try {
            // Send POST request to the backend
            const res = await axios.post('https://frontend-educational-backend.herokuapp.com/api/auth/signup', {
                email: formData.email,
                password: formData.password,
                username: formData.username,
                role: ["user"]
            });
            console.log("User successfully registered with email: " + formData.email + " Username: " + formData.username);
            navigate('/profile'); // Navigate to the profile page after successful registration
        } catch (e) {{
            handleError(e);
            setError(e.response.data.message || e.message);
        }
            console.error("Registration failed!!! ⛔", e);
            setError(e.response.data.message || e.message); // Show the error message from the response, if available
        }
        setLoading(false); // Set loading to false after sending data
    }

    const handleInputChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value }); // Update the form data state when input changes
    };

    return (
        <div className={styles["register-page"]}>
            <div className={styles["register-page__form"]}>
                <h2 className={styles["register-page__title"]}>Register</h2>
                <form onSubmit={handleSubmit}>
                    <div className={styles["input-group"]}>
                        <label>
                            Username
                            <input
                                className={styles["register-page__input"]}
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
                                className={styles["register-page__input"]}
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
                                className={styles["register-page__input"]}
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleInputChange}
                                required
                                minLength="6"
                            />
                        </label>
                    </div>
                    {error && <p className={styles["alert"]}>{error}</p>}
                    <StandardButton
                        type="submit"
                        disabled={loading}
                        className={styles["register-page__submit-button"]}
                    >
                        {loading ? 'Loading...' : 'Register'}
                    </StandardButton>
                    <p className={styles["register-page__login-text"]}>
                        Already have an account? You can{" "}
                        <Link to="/login" className={styles["register-page__register-link"]}>
                            login here
                        </Link>.
                    </p>

                </form>
            </div>
        </div>
    );
}

export default RegisterPage;
