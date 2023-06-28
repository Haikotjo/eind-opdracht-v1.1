import {createContext, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {checkTokenValidity} from "../helpers/checkTokenValidity";
import axios from "axios";

export const AuthContext = createContext(null)
function AuthContextProvider({children}) {

    const [auth, setAuth] = useState({
        isAuth: false,
        user: null,
        status: "pending"
    });
    const navigate = useNavigate();

    useEffect(()=>{
        const storedToken = localStorage.getItem('token')

        if (storedToken && checkTokenValidity(storedToken)) {
            login( storedToken )
        }else {
            setAuth({
                ...auth,
                isAuth: false,
                user: null,
                status: "done"
            })
        }

    },[])
    async function login(jwt_token, redirect) {
        localStorage.setItem('token', jwt_token);
        try {
            const { data: { email, username, id}} = await axios.get(`https://frontend-educational-backend.herokuapp.com/api/user/`,{
                headers: {
                    'Content-Type' : 'application/json',
                    Authorization: `Bearer ${jwt_token}`
                }
            })
            console.log(username)
            setAuth({
                ...auth,
                isAuth: true,
                user: {
                    email: email,
                    id: id,
                    username: username
                },
                status: "done"
            })
            console.log('De gebruiker is ingelogd 🔓')
            if(redirect) navigate(redirect);
        }catch (e)
        {

        }
    }

    function logout() {
        localStorage.removeItem('token');
        setAuth({
            ...auth,
            isAuth: false,
            user: null
        })
        console.log('De gebruiker is uitgelogd 🔒')
        navigate('/')
    }

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