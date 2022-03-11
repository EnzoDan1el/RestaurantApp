import User from '../components/User';
import classes from './Users.module.css';

const dummy = [
    {id:1, name: 'Enzo', email:'enzo@mail.com'},
    {id:2, name: 'Daniel', email:'daniel@mail.com'},
    {id:3, name: 'Mara', email:'mara@mail.com'},
    {id:4, name: 'Grace', email:'grace@mail.com'},
    {id:5, name: 'Guido', email:'guido@mail.com'},
]

const Users = () => {
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
                    {dummy.map(user => 
                        <li key={user.id}>
                            <User name={user.name} email={user.email}/>
                        </li>
                    )}
                </ul>
            </div>
        </div>
    );
}

export default Users;