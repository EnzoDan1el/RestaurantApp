import { fetchFunction } from "../utils/fetch-data";
import AuthContext from "../context-store/authentication-ctx";
import { useContext } from 'react';
import classes from './User.module.css';
import { useHistory } from "react-router-dom";


const User = ({ currentItems }) => {

    const ctx = useContext(AuthContext);
    const history = useHistory();

    const handleDelete = async (id) => {

        const request = `users/${id}`;
        const headers = {
            Accept: "*/*",
            Authorization: `${ctx.tokenType} ${ctx.accessToken}`
        }

        const response = await fetchFunction(request, 'DELETE', headers);
        console.log(response);
    }

    const handleEdit = (id) => {
        const strId = id.toString();
        history.push(`users/edit/${strId}`)
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
                            onClick={()=> handleEdit(user.id)}>
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