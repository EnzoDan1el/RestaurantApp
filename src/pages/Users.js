import classes from './Users.module.css';
import AuthContext from '../context-store/authentication-ctx';
import { useContext, useState, useEffect } from 'react';
import { fetchGet, fetchDelete } from '../utils/fetch-data';

const Users = () => {

    const [users, setUsers] = useState([]);
    const ctx = useContext(AuthContext);

    const handleDelete = async (id) => {
        const response = await fetchDelete('users', id, ctx.tokenType, ctx.accessToken);
        console.log(response);
    }
    
    useEffect(() => {
        const fetchUsers = async () => { 
            const items = await fetchGet('users', ctx.tokenType, ctx.accessToken);
            setUsers(items);
        };

        fetchUsers();
    }, [users]);

    return(
        <div className={classes.container}>
            <div className={classes.header}>
                <h1>Users</h1>
                <button>Add new user</button>
            </div>
            <hr/>
            <div className={classes['name-email']}>
                <h3>Name</h3>
                <h3>Email</h3>
            </div>
            <hr/>
            <div>
                <ul>
                    {users.map(user => 
                        <li key={user.id}>
                            <div className={classes.container2}>
                                <div>{user.name}</div>
                                <div>{user.email}</div>
                                <button 
                                    className={classes.edit} 
                                    onClick={()=> console.log(user.id)}>
                                        Edit
                                </button>
                                <button 
                                    className={classes.delete} 
                                    onClick={()=> handleDelete(user.id)}>
                                        Delete
                                </button>
                            </div>  
                        </li>
                    )}
                </ul>
            </div>
        </div>
    );
}

export default Users;