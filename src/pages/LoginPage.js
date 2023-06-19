import React, {useContext, useState} from 'react';
import {AuthContext} from "../context/AuthContext";

function LoginPage(props) {

    const {isAuth, login, logout} = useContext(AuthContext)
    const user = "Haiko"
    console.log(isAuth)


    return (
        <div>
            <button type={"button"} onClick={ isAuth? logout : login}>
                {isAuth ? 'Logout' : 'Login'}
            </button>
            { isAuth && <p>Welkom {user}</p> }
        </div>
    );
}

export default LoginPage;