import React, { useContext, useState } from 'react';
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { Link } from "react-router-dom";
import { Space, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import './Login.module.scss';

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
        <div className="login-page" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <div className="login-page__form" style={{ maxWidth: '50%', width: '600px' }}>
                <h2 className="login-page__title">Login</h2>
                <form onSubmit={handleSubmit} className="login-page__form">
                    <Space direction="vertical" style={{ width: '100%' }}>
                        <Input
                            size="large"
                            className="login-page__input"
                            placeholder="Gebruikersnaam"
                            prefix={<UserOutlined />}
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <Input.Password
                            size="large"
                            className="login-page__input"
                            placeholder="Wachtwoord"
                            prefix={<LockOutlined />}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Space>
                    {error && <p className="login-page__error">Error Onjuiste aanmeldgegevens.</p>}
                <p className="login-page__register-link">Heb je nog geen account? <Link to="/register">Registreer</Link> je dan eerst.</p>
                    <Button type="primary" htmlType="submit" className="login-page__submit-btn">Login</Button>
                </form>
            </div>
        </div>
    );
}

export default LoginPage;
