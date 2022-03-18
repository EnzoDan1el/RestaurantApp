import EditForm from "./Forms/EditForm";
import { useState, useEffect, useContext } from 'react';
import AuthContext from "../context-store/authentication-ctx";
import { fetchFunction } from "../utils/fetch-data";



const NewProduct = () => {

    const ctx = useContext(AuthContext);
    const initialValues = {
        name: '',
        description: '',
        category: '',
        price: ''
    }
    const [values, setValues] = useState(initialValues);
    const [products, setProducts] = useState([])

    const headers = {
        Accept: "text/plain",
        Authorization: `${ctx.tokenType} ${ctx.accessToken}`
    }

    const headersPost = {
        Accept: "text/plain",
        Authorization: `${ctx.tokenType} ${ctx.accessToken}`,
        "Content-Type": "application/json"
    }

    useEffect(()=>{

        const fetchProducts = async () => {
            const response = await fetchFunction('products', 'GET', headers);
            const items = await response.items;
            setProducts(items);
        }

        fetchProducts();
    }, [])
    
    const handleSelect = (event) => {
        setValues({
            ...values, 
            category: event.target.value
        })
    }
    const handleSubmit = (event) => {
        fetchFunction('products', 'POST', headersPost, JSON.stringify(values))
    }

    return(
        <EditForm 
            title='New Product'
            values={values}
            setValues={setValues}
            products={products} 
            handleSelect={handleSelect}
            handleSubmit={handleSubmit}
        />
    )
}

export default NewProduct;