import classes from './Header.module.css';
import Navigation from '../components/Navigation';
import { useContext } from 'react';
import AuthContext from '../context-store/authentication-ctx';


const Header = () => {

    const ctx = useContext(AuthContext);

    return(
        <header className={classes.header}>
            <div className={classes.logo}>MentorMate</div>
            {ctx.isLoggedIn && <div className={classes.navigation}><Navigation /></div>}
        </header>
    );
}

export default Header;