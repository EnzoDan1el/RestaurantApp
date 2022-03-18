import classes from './Categories.module.css';
import AuthContext from '../context-store/authentication-ctx';
import { useContext, useEffect, useState } from 'react';
import { fetchFunction } from '../utils/fetch-data';
import Category from '../components/Category';
import { useHistory } from 'react-router-dom';

const Categories = () => {

    const ctx = useContext(AuthContext);
    const history = useHistory();
    const [categories, setCategories] = useState([]); 
    const headers = {
        Accept: "text/plain",
        Authorization: `${ctx.tokenType} ${ctx.accessToken}`
    }

    useEffect(()=>{
        const fetchData = async () => {
            const response = await fetchFunction('categories', 'GET', headers);
            const {data} = await response
            setCategories(data);
        }

        fetchData()
    })

    const handleClick = () => {
        history.push('/categories/new')
    }
    
    return(
        <div className={classes['cat-container']}>
            <div className={classes['cat-header']}>
                <h1>Categories</h1>
                <button onClick={handleClick}>Add new category</button>
            </div>
            <hr/>
            <Category categories={categories}/>
        </div>
    );
}

export default Categories;