import classes from './Orders.module.css';
import Order from '../components/Order';
import { useEffect, useState, useContext } from 'react';
import AuthContext from '../context-store/authentication-ctx'
import { fetchFunction } from '../utils/fetch-data';
import ReactPaginate from 'react-paginate';

const Orders = () => {

    const [orders, setOrders] = useState([]);
    const [order, setOrder] = useState('');
    const [status, setStatus] = useState('All');
    const [userName, setUserName] = useState('');
    const [tableNumbers, setTableNumbers] = useState([]);
    const [selectedTable, setSelectedTable] = useState();
    const [found, setFound] = useState(true);
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
        const arr = items.map(item => item.tableNumber);
        const uniq = [...new Set(arr)];
        uniq.sort((a, b) => a - b)
        setTableNumbers(uniq);
        setOrders(items);

        const endOffset = itemOffset + itemsPerPage;
        setCurrentItems(items.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(items.length / itemsPerPage));
    }

    useEffect(()=>{

        fetchOrders('orders?PageSize=20')
    }, []);

    useEffect(()=>{

        const endOffset = itemOffset + itemsPerPage;
        setCurrentItems(orders.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(orders.length / itemsPerPage));

    }, [itemOffset]);
    
    useEffect(()=>{
        if(status === 'All'){

            const endOffset = itemOffset + itemsPerPage;
            setCurrentItems(orders.slice(itemOffset, endOffset));
            setPageCount(Math.ceil(orders.length / itemsPerPage));

        }else {
            const tmpArray = orders.filter(order => order.status === status)
            setCurrentItems(tmpArray);
        }

    }, [status]);

    useEffect(()=>{
        if(selectedTable === 'All'){

            const endOffset = itemOffset + itemsPerPage;
            setCurrentItems(orders.slice(itemOffset, endOffset));
            setPageCount(Math.ceil(orders.length / itemsPerPage));

        }else {
            const tmpArray = orders.filter(order => order.tableNumber.toString() === selectedTable.toString())
            setCurrentItems(tmpArray);
        }

    }, [selectedTable]);

    useEffect(()=>{
        const tmpItem = orders.filter(order => order.userName.toLowerCase().indexOf(userName.toLowerCase()) !== -1)
        if(tmpItem.length > 0){
            setCurrentItems(tmpItem);
            setFound(true);
        }else{
            setFound(false);
        }

        if(!userName) {
            setFound(true);
            const endOffset = itemOffset + itemsPerPage;
            setCurrentItems(orders.slice(itemOffset, endOffset));
            setPageCount(Math.ceil(orders.length / itemsPerPage));
        }

    }, [userName])

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

    const handleTableSelect = (event) => {
        setSelectedTable(event.target.value);
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
                <select onChange={handleTableSelect}>
                    <option value={'All'}>All</option>
                    {tableNumbers.map(item => (
                        <option value={item}>{item}</option>
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
            {!found && <p style={{color: 'red'}}>No waiter with that name</p>}
            <Order currentItems={currentItems}/>
            {status === 'All' && 
                <ReactPaginate
                    breakLabel="..."
                    nextLabel="next >"
                    onPageChange={handlePageClick}
                    pageCount={pageCount}
                    previousLabel="< previous"
                    renderOnZeroPageCount={null}
                    className={classes.bar}
                    activeClassName={classes.active}
                />
            }
        </div>
    );
}

export default Orders;