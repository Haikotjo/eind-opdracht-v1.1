import React, { useState } from 'react';
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import styles from './Register.module.scss';

function RegisterPage() {
    const navigate = useNavigate();
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
    });

    const handleSubmit = async (event) => {
        event.preventDefault();

        setError(false);
        setLoading(true);

        try {
            const res = await axios.post('https://frontend-educational-backend.herokuapp.com/api/auth/signup', {
                email: formData.email,
                password: formData.password,
                username: formData.username,
                role: ["user"]
            });
            console.log("User successfully registered with Email: " + formData.email + " Username: " + formData.username);
            navigate('/profile');
        } catch (e) {
            console.error("Registration failed!!! ⛔", e);
            setError(true);
        }
        setLoading(false);
    }

    const handleInputChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };

    return (
        <div className={styles["register-page"]}>
            <form onSubmit={handleSubmit} className={styles["register-page__form"]}>
                <h2>Register</h2>
                {error && <div className={styles["alert"]}>This account already exists. Try another email address.</div>}
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
                <p>Already have an account? You can <Link to="/login">login here</Link>.</p>
            </form>
        </div>
    );
}

export default RegisterPage;
