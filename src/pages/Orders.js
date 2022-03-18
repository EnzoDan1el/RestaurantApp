import classes from './Orders.module.css';
import Order from '../components/Order';
import { useEffect, useState, useContext } from 'react';
import AuthContext from '../context-store/authentication-ctx'
import { fetchFunction } from '../utils/fetch-data';
import ReactPaginate from 'react-paginate';

const Orders = () => {

    const [orders, setOrders] = useState([]);
    const [order, setOrder] = useState('');
    const [status, setStatus] = useState('');
    const [userName, setUserName] = useState('');
    const ctx = useContext(AuthContext);
    const headers = {
        Accept: "text/plain",
        Authorization: `${ctx.tokenType} ${ctx.accessToken}`
    }

    const [currentItems, setCurrentItems] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);
    const itemsPerPage = 3;

    const fetchOrders = async (request) => {
        const response = await fetchFunction(request, 'GET', headers);
        const {data} = await response;
        const { items } = data;
        setOrders(items);

        const endOffset = itemOffset + itemsPerPage;
        setCurrentItems(items.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(items.length / itemsPerPage));
    }

    useEffect(()=>{

        fetchOrders('orders')
    }, []);

    useEffect(()=>{

        fetchOrders('orders')
    }, [itemOffset]);
    
    useEffect(()=>{
        console.log("render status");
        let request;
        if(status === 'All'){
            request = order ? `orders?SortDirection=${order}`: `orders`
        }else{
            request = order ? 
                `orders?Status=${status}&SortDirection=${order}`: 
                `orders?Status=${status}`;
        }

        request = userName ?  request + `UserName=${userName}`: request;

        fetchOrders(request);

    }, [status, order])

    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % orders.length;
        setItemOffset(newOffset);
    };

    const handleOrderClick = () => {
        if(order === ''){
            setOrder('Asc');
        }else{
            const newOrder = order === 'Asc' ? 'Desc' : 'Asc';
            setOrder(newOrder)
        }   
    }

    const handleStatusSelect = (event) => {
        setStatus(event.target.value);
    }

    return(
        <div className={classes.order}>
            <h1>Orders</h1>
            <hr/>
            <div className={classes['order-labels']}>
                <p>Waiter</p>
                <p>Table</p>
                <p>Status</p>
            </div>
            <div className={classes['order-inputs']}>
                <input 
                    type='text'
                    value={userName}
                    onChange={e => setUserName(e.target.value)}
                />
                <select>
                    <option>All</option>
                    {orders.map(item => (
                        <option value={item.tableId}>{item.tableId}</option>
                    ))}
                </select>
                <select onChange={handleStatusSelect}>
                    <option value={'All'}>All</option>
                    <option value={'Active'}>Active</option>
                    <option value={'Complete'}>Complete</option>
                </select>
                <button className={classes['order-filter']}>Filter</button>
            </div>
            <div className={classes['order-options']}>
                <h4 onClick={handleOrderClick}>Orders</h4>
                <h4 onClick={handleOrderClick}>Table</h4>
                <h4 onClick={handleOrderClick}>Waiter</h4>
                <h4 onClick={handleOrderClick}>Date</h4>
                <h4 onClick={handleOrderClick}>Status</h4>
                <h4 onClick={handleOrderClick}>Price</h4>
            </div>
            <hr/>
            <Order currentItems={currentItems}/>
            <ReactPaginate
                breakLabel="..."
                nextLabel="next >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                pageCount={pageCount}
                previousLabel="< previous"
                renderOnZeroPageCount={null}
                className={classes.bar}
                activeClassName={classes.active}
            />
        </div>
    );
}

export default Orders;