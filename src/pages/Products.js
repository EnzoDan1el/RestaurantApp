import classes from './Products.module.css';
import Product from '../components/Product';
import { useContext, useState, useEffect } from 'react';
import AuthContext from '../context-store/authentication-ctx';
import { fetchFunction } from '../utils/fetch-data';
import ReactPaginate from 'react-paginate';
import { useHistory } from 'react-router-dom';
import { toBeEmpty } from '@testing-library/jest-dom/dist/matchers';

const Products = () => {

    const history = useHistory();
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState('');
    const [found, setFound] = useState(true);
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
        const data = await fetchFunction('products?PageSize=20', 'GET', headers);
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

        const endOffset = itemOffset + itemsPerPage;
        setCurrentItems(products.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(products.length / itemsPerPage));

    }, [ itemOffset ]);

    useEffect(()=>{

        if(category === 'All'){

            const endOffset = itemOffset + itemsPerPage;
            setCurrentItems(products.slice(itemOffset, endOffset));
            setPageCount(Math.ceil(products.length / itemsPerPage));

        }else {
            const tmpArray = products.filter(product => product.category === category)
            setCurrentItems(tmpArray);
        }

    }, [category])

    useEffect(()=>{
        const tmpItem = products.filter(product => product.name.toLowerCase().indexOf(search.toLowerCase()) !== -1)
        if(tmpItem.length > 0){
            setCurrentItems(tmpItem);
            setFound(true);
        }else {
            setFound(false);
        }

        if(!search) {
            setFound(true);
            const endOffset = itemOffset + itemsPerPage;
            setCurrentItems(products.slice(itemOffset, endOffset));
            setPageCount(Math.ceil(products.length / itemsPerPage));
        }

    }, [search])
    
    
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
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <select value={category} onChange={handleSelect}>
                        <option value={'All'}>All</option>
                        {products.map(item => 
                            <option value={item.category}>{item.category}</option>
                        )}
                    </select>
                    <button 
                      className={classes['filter-button']}>
                          Filter
                    </button>
                </div>
                
            </div>
            <hr/>
            <div className={classes['second-header']}>
                <h4>Name</h4>
                <h4>Category</h4>
                <h4>Price</h4>
            </div>
            <div>
                {!found && <p style={{color: 'red'}}>No product with that name</p>}
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