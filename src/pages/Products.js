import classes from './Products.module.css';
import Product from '../components/Product';
import { useContext, useState, useEffect } from 'react';
import AuthContext from '../context-store/authentication-ctx';
import { fetchFunction } from '../utils/fetch-data';
import ReactPaginate from 'react-paginate';

const Products = () => {

    const [products, setProducts] = useState([]);
    const [renderedProducts, setRenderedProducts] = useState([]);
    const [search, setSearch] = useState('');
    const ctx = useContext(AuthContext);
    const [currentItems, setCurrentItems] = useState(null);
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);
    const itemsPerPage = 3;
    const [category, setCategory] = useState('All');
    
    useEffect(() => {
        const headers = {
            Accept: "text/plain",
            Authorization: `${ctx.tokenType} ${ctx.accessToken}`
        }

        const fetchProducts = async () => { 
            const data = await fetchFunction('products', 'GET', headers);
            const items = await data.items;
            setProducts(items)
            setRenderedProducts(items);
            
            const endOffset = itemOffset + itemsPerPage;
            setCurrentItems(renderedProducts.slice(itemOffset, endOffset));
            setPageCount(Math.ceil(renderedProducts.length / itemsPerPage));
        };

        fetchProducts();
    }, [products, itemOffset, itemsPerPage]);

    useEffect(()=>{
        const searchArr = products.filter(product => product.name.localeCompare(search) === 0);
        if(searchArr.length > 0){
            setRenderedProducts(searchArr);
        }else{
            setRenderedProducts(['Not Found'])
        }
    }, [products, search])

    useEffect(()=>{

        if(category === 'All'){
            setRenderedProducts(products);
        }else {
            const tmpArray = products.filter(product => product.category === category)
            setRenderedProducts(tmpArray);
        }

    }, [products, category])

    const handlePageChange = (event) => {
        const newOffset = (event.selected * itemsPerPage) % renderedProducts.length;
        setItemOffset(newOffset);
    };

    const handleSelect = (event) => {
        setCategory(event.target.value)
    }

    const handleSearch = (event) => {
        setCategory('All');
        setSearch(event.target.value);
    }

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
                    <input 
                        type='text'
                        value={search}
                        onChange={handleSearch}
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