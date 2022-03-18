import classes from './Category.module.css';
import { useHistory } from 'react-router-dom';
import AuthContext from '../context-store/authentication-ctx';
import { useContext } from 'react';
import { fetchFunction } from '../utils/fetch-data';

const Category = ({ categories }) => {
    
    const ctx = useContext(AuthContext);
    const history = useHistory();
    const headers = {
        Accept: "text/plain",
        Authorization: `${ctx.tokenType} ${ctx.accessToken}`
    }

    const handleDelete = (id) => {
        const newId = id.toString();
        const request = `categories/${newId}`;

        const confirm = window.confirm("_Are you sure you want to delete this category?_");

        if(confirm){
            fetchFunction(request, 'DELETE', headers);
        }
    }

    const handleEdit = (id) => {
        const newId = id.toString();
        history.push(`categories/edit/${newId}`)
    }

    return(
        <ul>
            {categories.map(item => (
                <div>
                    <li key={item.id} className={classes.list}>
                        <div className={classes.inner}>
                            <div>{item.name}</div>
                            <div className={classes.buttons}>
                                <button 
                                  className={classes.edit}
                                  onClick={() => handleEdit(item.id)}>
                                      Edit
                                </button>
                                <button 
                                  className={classes.delete}
                                  onClick={() => handleDelete(item.id)}>
                                      Delete
                                </button>
                            </div>
                        </div>
                        {item.subcategories.length > 0 &&     
                            <Category categories={item.subcategories}/>    
                        }
                    </li>
                </div>
            ))}
        </ul>
    )
}

export default Category;