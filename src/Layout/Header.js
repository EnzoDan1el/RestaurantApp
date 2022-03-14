import classes from './Header.module.css';
import Navigation from '../components/Navigation';
import { useContext } from 'react';
import AuthContext from '../context-store/authentication-ctx';
import { useHistory } from 'react-router-dom';


const Header = () => {

    const ctx = useContext(AuthContext);
    const history = useHistory();

    const handleLogoClick = () => {
        history.push("/tables");
    }

    return(
        <header className={classes.header}>
            <div onClick={handleLogoClick} className={classes.logo}>MentorMate</div>
            {ctx.isLoggedIn && <div className={classes.navigation}><Navigation /></div>}
        </header>
    );
}

export default Header;