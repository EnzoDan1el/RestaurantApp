import classes from './Products.module.css';
import Product from '../components/Product';
import { useContext, useState, useEffect } from 'react';
import AuthContext from '../context-store/authentication-ctx';
import { fetchFunction } from '../utils/fetch-data';
import ReactPaginate from 'react-paginate';
import { useHistory } from 'react-router-dom';

const Products = () => {

    const history = useHistory();
    const [products, setProducts] = useState([]);
    const ctx = useContext(AuthContext);
    const [currentItems, setCurrentItems] = useState(null);
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);
    const itemsPerPage = 3;
    const [category, setCategory] = useState('All');

    const headers = {
        Accept: "text/plain",
        Authorization: `${ctx.tokenType} ${ctx.accessToken}`
    }
    const fetchProducts = async () => { 
        const data = await fetchFunction('products', 'GET', headers);
        const items = await data.items;
        setProducts(items)
     
        const endOffset = itemOffset + itemsPerPage;
        setCurrentItems(items.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(items.length / itemsPerPage));
    };
    
    useEffect(() => {

        fetchProducts();

    }, []);

    useEffect(() => {

        fetchProducts();

    }, [ itemOffset ]);

    useEffect(()=>{

        if(category === 'All'){

            const endOffset = itemOffset + itemsPerPage;
            setCurrentItems(products.slice(itemOffset, endOffset));
            setPageCount(Math.ceil(products.length / itemsPerPage));

        }else {
            const tmpArray = products.filter(product => product.category === category)
            console.log(tmpArray);
            setCurrentItems(tmpArray);
        }

    }, [category])
    
    
    const handlePageChange = (event) => {
        const newOffset = (event.selected * itemsPerPage) % products.length;
        setItemOffset(newOffset);
    };

    const handleSelect = (event) => {
        setCategory(event.target.value)
    }

    const handleNewProduct = () => {
        history.push('/products/new')
    }

    return(
        <div className={classes.container}>
            <div className={classes.header}>
                <h1>Products</h1>
                <button onClick={handleNewProduct}>Add new product</button>
            </div>
            <hr/>
            <div className={classes.filter}>
                <div className={classes.labels}>
                    <p>Product</p>
                    <p>Category</p>
                </div>
                <div className={classes.inputs}>
                    <input 
                        type='text'
                    />
                    <select value={category} onChange={handleSelect}>
                        <option value={'All'}>All</option>
                        {products.map(item => 
                            <option value={item.category}>{item.category}</option>
                        )}
                    </select>
                    <button className={classes['filter-button']}>Filter</button>
                </div>
                
            </div>
            <hr/>
            <div className={classes['second-header']}>
                <h4>Name</h4>
                <h4>Category</h4>
                <h4>Price</h4>
            </div>
            <div>
                <Product currentItems={currentItems ? currentItems : []}/>
                <ReactPaginate
                    breakLabel='...'
                    nextLabel='next >'
                    onPageChange={handlePageChange}
                    pageCount={pageCount}
                    previousLabel='< previous'
                    renderOnZeroPageCount={null}
                    className={classes['bar-product']}
                    activeClassName={classes.active}
                />
            </div>
        </div>
    );
}

export default Products;