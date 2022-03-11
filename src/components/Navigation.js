import classes from './Navigation.module.css';
import { NavLink } from 'react-router-dom';

const Navigation = () => {
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
                <li>
                    <NavLink to='/products' className={classes.item} activeClassName={classes.active}>
                        Products
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/categories' className={classes.item} activeClassName={classes.active}>
                        Categories
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/users' className={classes.item} activeClassName={classes.active}>
                        Users
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
}

export default Navigation;