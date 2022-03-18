import classes from './Table.module.css';

const Table = ({tables}) => {

    const dumb = {id: 2, number: 2, status: 'Free', capacity: 4, userId: 20, userName: null, totalPrice: null}

    return(
        <div className={classes['table-container']}>
            <div className={classes['table-header']}>
                <div 
                    className={tables.status === 'Active' ? 
                        classes['status-active'] : classes['status-free']}
                >
                    {tables.status}
                </div>
                <div>Capacity: {tables.capacity}</div>
            </div>
            <div className={classes['table-id']}>
                <h2>#{tables.number}</h2>
            </div>
            <div className={classes['table-waiter']}>
                <p>Waiter: {tables.userName ? tables.userName : 'N/A'}</p>
            </div>
            <div className={classes['table-price']}>
                <p>Total: {tables.totalPrice ? tables.totalPrice : 0}</p>
            </div>
        </div>
    )
}

export default Table;