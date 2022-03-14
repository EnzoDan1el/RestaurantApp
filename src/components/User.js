import { fetchFunction } from "../utils/fetch-data";
import AuthContext from "../context-store/authentication-ctx";
import { useContext } from 'react';
import classes from './User.module.css';


const User = ({ currentItems }) => {

    const ctx = useContext(AuthContext);

    const handleDelete = async (id) => {

        const request = `users/${id}`;
        const headers = {
            Accept: "*/*",
            Authorization: `${ctx.tokenType} ${ctx.accessToken}`
        }

        const response = await fetchFunction(request, 'DELETE', headers);
        console.log(response);
    }
    
    return(
        <ul>
            {currentItems.map(user => 
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
    );
}

export default User;