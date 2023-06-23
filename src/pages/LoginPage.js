import React, {useContext, useState} from 'react';
import {AuthContext} from "../context/AuthContext";
import axios from "axios";

function LoginPage() {

    const {login} = useContext(AuthContext)

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState(null)
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post ('http://localhost:3000/login', {
                email,
                password
            });
            login(res.data.accessToken);
        }catch (e) {
            console.log("Onuist email en wachtwoord combinatie". e)
            setError(true)
        }
    }


    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email">Email</label>
                    <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="password">Wachtwoord</label>
                    <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                </div>
                {error && <p> Error Onuist email en wachtwoord combinatie</p> }
                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default LoginPage;