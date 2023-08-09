import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { checkTokenValidity } from "../helpers/checkTokenValidity";
import { clearLocalStorage } from "../helpers/ClearLocalStorage";
import { handleError } from "../helpers/handleError";
import useIdleTimer from "../hooks/UseIdleTimer";

// AuthContext is created and can be used to share authentication status between components.
export const AuthContext = createContext(null);

function AuthContextProvider({ children }) {
    const [auth, setAuth] = useState({
        isAuth: false,
        user: null,
        status: "pending"
    });
    const navigate = useNavigate();

    // This function is used to log in the user.
    async function login(jwt_token, redirect) {
        localStorage.setItem('token', jwt_token);
        try {
            const { data: { email, username, id } } = await axios.get(`https://frontend-educational-backend.herokuapp.com/api/user/`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${jwt_token}`
                }
            });
            setAuth({
                ...auth,
                isAuth: true,
                user: {
                    email: email,
                    id: id,
                    username: username
                },
                status: "done"
            });
            console.log('User logged in 🔓');
            if (redirect) navigate(redirect);
        } catch (e) {
            handleError(e);
        }
    }

    // This function is used to log out the user.
    function logout() {
        clearLocalStorage();
        setAuth({
            ...auth,
            isAuth: false,
            user: null
        });
        console.log('User logged out 🔒');
        navigate('/');
    }

    // When the component is loaded, it checks if there is a token in the local storage
    // and if the token is valid. If yes, the user is logged in.
    useEffect(() => {
        const storedToken = localStorage.getItem('token');

        if (storedToken && checkTokenValidity(storedToken)) {
            login(storedToken);
        } else {
            setAuth({
                ...auth,
                isAuth: false,
                user: null,
                status: "done"
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // If there has been no activity for an hour, the user is automatically logged out.
    useIdleTimer(logout, 3600000);

    // The context provider makes the authentication status, login, and logout functions available
    // to all child components.
    const data = {
        isAuth: auth.isAuth,
        user: auth.user,
        logout: logout,
        login: login
    }

    return (
        <AuthContext.Provider value={data}>
            {auth.status === "done" ? children : <p>loading...</p>}
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;
