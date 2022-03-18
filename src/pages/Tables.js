import AuthContext from "../context-store/authentication-ctx";
import { useContext, useEffect, useState } from 'react';
import { fetchFunction } from "../utils/fetch-data";
import Table from "../components/Table";
import classes from './Tables.module.css';

const Tables = () => {

    const ctx = useContext(AuthContext);
    const [tables, setTables] = useState([]);

    const headers = {
        Accept: "text/plain",
        Authorization: `${ctx.tokenType} ${ctx.accessToken}`
    }

    useEffect(()=>{
        const fetchTables = async () => {
            const response = await fetchFunction('tables', 'GET', headers);
            setTables(response);
        }

        fetchTables();
    }, [])
    
    return(
        <div className={classes['tables-container']}>
            <div>
                <h1>Tables</h1>
                <hr />
            </div>
            <div className={classes['tables-grid']}>
                {tables.map(table => (
                    <div className={classes['single-table']}>
                        <Table tables={table} />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Tables;