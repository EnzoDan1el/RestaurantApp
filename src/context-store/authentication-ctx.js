import { createContext, useState } from "react";

const AuthContext = createContext({
    isLoggedIn: false,
    role: '',
    accessToken: '',
    tokenType: '',
    login: () => {},
    logout: () => {},
    roleSetter: () => {},
    accessTokenSetter: () => {},
    tokenTypeSetter: () => {}
})

export const AuthContextProvider = (props) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);    
    const [role, setRole] = useState('');    
    const [accessToken, setAccessToken] = useState('');    
    const [tokenType, setTokenType] = useState('');    

    const handleLogin = () => {
        setIsLoggedIn(true);
    }
    const handleLogout = () => {
        setIsLoggedIn(false);
    }    
    const handleRole = (role) => {
        setRole(role);
    }    
    const handleAccessToken = (token) => {
        setAccessToken(token);
    }
    const handleTokenType = (type) => {
        setTokenType(type);
    }    


    return(
        <AuthContext.Provider value={{
            isLoggedIn: isLoggedIn,
            role: role,
            accessToken: accessToken,
            tokenType: tokenType,
            login: handleLogin,
            logout: handleLogout,
            roleSetter: handleRole,
            accessTokenSetter: handleAccessToken,
            tokenTypeSetter: handleTokenType
        }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContext;