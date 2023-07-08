import React, { useEffect, useState } from 'react';
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Form, Input, Button, Alert } from 'antd';

function RegisterPage() {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async ({ username, email, password }) => {
        setError(false);
        setLoading(true);

        try {
            const res = await axios.post('https://frontend-educational-backend.herokuapp.com/api/auth/signup', {
                email: email,
                password: password,
                username: username,
                role: ["user"]
            });
            console.log("User successfully registered with Email: " + email + " Username: " + username);
            navigate('/profile');
        } catch (e) {
            console.error("Registration failed!!! ⛔", e);
            setError(true);
        }
        setLoading(false);
    }

    return (
        <div className="register-page" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <Form
                form={form}
                className="register-page__form"
                style={{ maxWidth: '50%', width: '600px' }}
                layout="vertical"
                onFinish={handleSubmit}
            >
                <h2>Register</h2>
                {error && <Alert message="This account already exists. Try another email address." type="error" showIcon />}
                <Form.Item
                    label="Username"
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your username!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                        {
                            type: 'email',
                            message: 'The input is not valid E-mail!',
                        },
                        {
                            required: true,
                            message: 'Please input your E-mail!',
                        },
                    ]}
                    hasFeedback
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                        {
                            min: 6,
                            message: 'Password must be minimum 6 characters.',
                        },
                    ]}
                    hasFeedback
                >
                    <Input.Password />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" loading={loading}>
                        Register
                    </Button>
                    <p>Already have an account? You can <Link to="/login">login here</Link>.</p>
                </Form.Item>
            </Form>
        </div>
    );
}

export default RegisterPage;
