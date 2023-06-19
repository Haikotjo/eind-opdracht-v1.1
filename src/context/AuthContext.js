import React, {createContext, useState} from 'react';

export const AuthContext = createContext(null)
function AuthContextProvider({children}) {

    const [isAuth, setIsAuth] = useState(false)

    function login() {
        setIsAuth(true)
    }

    function logout() {
        setIsAuth(false)
    }

    const data = {
        isAuth: isAuth,
        login: login,
        logout: logout
    }

    return (
        <AuthContext.Provider value={data}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;