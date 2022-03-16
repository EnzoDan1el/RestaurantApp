import classes from './Order.module.css';
import { format } from '../utils/format';
import AuthContext from '../context-store/authentication-ctx';
import { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { fetchFunction } from '../utils/fetch-data';

const Order = ({currentItems}) => {

    const ctx = useContext(AuthContext);
    const history = useHistory();

    const handleDelete = (id) => {
        const newId = id.toString();
        const request = `orders/${newId}`;
        const headers = {
            Accept: "*/*",
            Authorization: `${ctx.tokenType} ${ctx.accessToken}`
        }
        const confirmation = window.confirm("_Are you sure you want to delete this order?_");
        if(confirmation){
            fetchFunction(request, 'DELETE', headers);
        }
        
    }

    const handleEdit = (id) => {
        const newId = id.toString();
        history.push(`/orders/edit/${newId}`)
    }

    return(
        <ul>
            {currentItems.map(order => (  
                <li key={order.id}>
                    <div className={classes.container}>
                        <div>{order.id}</div>
                        <div>{order.tableNumber}</div>
                        <div>{order.userName}</div>
                        <div>{format(order.createdAt)}</div>
                        <div>{order.status}</div>
                        <div>{order.totalPrice}</div>
                        
    
                        <button 
                          className={classes['order-edit']}
                          onClick={()=> handleEdit(order.id)}>
                            Edit
                        </button>
                        {ctx.role === 'Admin' &&
                            <button 
                              className={classes['order-delete']}
                              onClick={handleDelete}>
                                Delete
                            </button>
                        }
                     
                    </div>
                </li>
            ))}
        </ul>
    )
}

export default Order;