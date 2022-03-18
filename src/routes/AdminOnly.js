import { Route, Redirect } from "react-router-dom"
import AuthContext from "../context-store/authentication-ctx"
import { useContext } from 'react';

const AdminOnly = ( {children, ...rest} ) => {
    const ctx = useContext(AuthContext);

    return <Route {...rest} render={()=>{
        return ctx.isLoggedIn && ctx.role === 'Admin' ? 
            children :
            <Redirect to='/'/>
    }} />
}

export default AdminOnly;