import classes from './Products.module.css';
import Product from '../components/Product';

const dummy = [
    {id: 1, name: 'Product1', category: 'category 1.1', price: '12'},
    {id: 2, name: 'Product2', category: 'category 1.2', price: '13'},
    {id: 3, name: 'Product3', category: 'category 1.3', price: '14'},
    {id: 4, name: 'Product4', category: 'category 1.4', price: '15'},
    {id: 5, name: 'Product5', category: 'category 1.5', price: '16'},
    {id: 6, name: 'Product6', category: 'category 1.6', price: '17'},
]

const Products = () => {
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
                        {dummy.map(item => 
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
                    {dummy.map((item) => 
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