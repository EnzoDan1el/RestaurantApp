import classes from './Product.module.css';
import { fetchFunction } from '../utils/fetch-data';
import { useContext } from 'react';
import AuthContext from '../context-store/authentication-ctx';
import { useHistory } from 'react-router-dom';

const Product = ({currentItems}) => {

    const history = useHistory();
    const ctx = useContext(AuthContext);
    const headers = {
        Accept: "*/*",
        Authorization: `${ctx.tokenType} ${ctx.accessToken}`
    }

    const handleDelete = async (id) => {
        const newId = id.toString();
        const request = `products/${newId}`;
        const confirmation = window.confirm("_Are you sure you want to delete this product?_");

        if(confirmation){
            fetchFunction(request, 'DELETE', headers);
        }   
    }

    const handleEdit = (id) => {
        const newId = id.toString();
        history.push(`/products/edit/${newId}`)    
    }    

    return(
        <ul>
            {currentItems.map(product => 
                <li key={product.id}>
                    <div className={classes.container}>
                        <div>{product.name}</div>
                        <div>{product.category}</div>
                        <div>{product.price}</div>
                        
                        <button 
                          className={classes.edit}
                          onClick={() => handleEdit(product.id)}>
                              Edit
                        </button>
                        <button 
                          className={classes.delete}
                          onClick={handleDelete}>
                              Delete
                        </button> 
                    </div>  
                </li>
            )}
        </ul>
    );
}

export default Product