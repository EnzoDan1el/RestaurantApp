import { Route, Redirect } from "react-router-dom"
import AuthContext from "../context-store/authentication-ctx"
import { useContext } from 'react';

const ProtectedRoute = ( {children, ...rest} ) => {
    const ctx = useContext(AuthContext);

    return <Route {...rest} render={()=>{
        return ctx.isLoggedIn ? children : <Redirect to='/'/>
    }} />
}

export default ProtectedRoute;