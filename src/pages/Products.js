import classes from './Products.module.css';
import Product from '../components/Product';
import { useContext, useState, useEffect } from 'react';
import AuthContext from '../context-store/authentication-ctx';
import { fetchFunction } from '../utils/fetch-data';

const Products = () => {

    const [products, setProducts] = useState([]);
    const ctx = useContext(AuthContext);
    
    useEffect(() => {
        const headers = {
            Accept: "text/plain",
            Authorization: `${ctx.tokenType} ${ctx.accessToken}`
        }

        const fetchProducts = async () => { 
            const data = await fetchFunction('products', 'GET', headers);
            const items = await data.items;
            setProducts(items);
        };

        fetchProducts();
    }, []);


    return(
        <div className={classes.container}>
            <div className={classes.header}>
                <h1>Products</h1>
                <button>Add new product</button>
            </div>
            <hr/>
            <div className={classes.filter}>
                <div className={classes.labels}>
                    <p>Product</p>
                    <p>Category</p>
                </div>
                <div className={classes.inputs}>
                    <input type='text'/>
                    <select>
                        {products.map(item => 
                            <option value={item.category}>{item.category}</option>
                        )}
                    </select>
                </div>
            </div>
            <hr/>
            <div className={classes['second-header']}>
                <h4>Name</h4>
                <h4>Category</h4>
                <h4>Price</h4>
            </div>
            <div>
                <ul>
                    {products.map((item) => 
                        <li key={item.id}>
                            <Product name={item.name} category={item.category} price={item.price}/>
                        </li>
                    )}
                </ul>
            </div>
        </div>
    );
}

export default Products;