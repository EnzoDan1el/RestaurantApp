import classes from './Navigation.module.css';
import { NavLink } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from "../context-store/authentication-ctx";

const Navigation = () => {
    const ctx = useContext(AuthContext);

    const handleLogout = () => {
        ctx.logout();
    }

    return(
        <nav>
            <ul className={classes.ul}>
                <li >
                    <NavLink to='/tables' className={classes.item} activeClassName={classes.active}>
                        Tables
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/orders' className={classes.item} activeClassName={classes.active}>
                        Orders
                    </NavLink>
                </li>
                {ctx.role === 'Admin' && 
                    <li>
                        <NavLink to='/products' className={classes.item} activeClassName={classes.active}>
                            Products
                        </NavLink>
                    </li>
                }
                {ctx.role === 'Admin' && 
                    <li>
                        <NavLink to='/categories' className={classes.item} activeClassName={classes.active}>
                            Categories
                        </NavLink>
                    </li>
                }
                {ctx.role === 'Admin' && 
                    <li>
                        <NavLink to='/users' className={classes.item} activeClassName={classes.active}>
                            Users
                        </NavLink>
                    </li>
                }
            </ul>
            <button className={classes.logout} onClick={handleLogout}>Logout</button>
        </nav>
    );
}

export default Navigation;