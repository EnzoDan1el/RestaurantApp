import classes from './Users.module.css';
import AuthContext from '../context-store/authentication-ctx';
import { useContext, useState, useEffect } from 'react';
import { fetchFunction } from '../utils/fetch-data';
import ReactPaginate from 'react-paginate';
import User from '../components/User';
import { useHistory } from 'react-router-dom';

const Users = () => {

    const [users, setUsers] = useState([]);
    const ctx = useContext(AuthContext);
    const history = useHistory();

    const [currentItems, setCurrentItems] = useState(null);
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);
    const itemsPerPage = 3;
    
    useEffect(() => {

        let isApiSubscribed = true;

        const headers = {
            Accept: "text/plain",
            Authorization: `${ctx.tokenType} ${ctx.accessToken}`
        }

        const fetchUsers = async () => { 
            const data = await fetchFunction('users', 'GET', headers);
            const items = await data.items;
            setUsers(items);

            const endOffset = itemOffset + itemsPerPage;
            setCurrentItems(users.slice(itemOffset, endOffset));
            setPageCount(Math.ceil(users.length / itemsPerPage));
        };
        
        if(isApiSubscribed){
            fetchUsers();
        }

        return () => { isApiSubscribed = false }

    }, [users, itemOffset, itemsPerPage]);

    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % users.length;
        setItemOffset(newOffset);
    };

    const handleNewUSer = () => {
        history.push('/users/new')
    }

    return(
        <div className={classes.container}>
            <div className={classes.header}>
                <h1>Users</h1>
                <button onClick={handleNewUSer}>Add new user</button>
            </div>
            <hr/>
            <div className={classes['name-email']}>
                <h3>Name</h3>
                <h3>Email</h3>
            </div>
            <hr/>
            <div>
                <User currentItems={currentItems ? currentItems : []} />
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
        </div>
    );
}

export default Users;