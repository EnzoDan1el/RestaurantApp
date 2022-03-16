import { useParams } from "react-router-dom";
import AuthContext from "../context-store/authentication-ctx";
import { useContext, useState, useEffect } from "react";
import EditForm from "./Forms/EditForm";
import { fetchFunction } from "../utils/fetch-data";
import { useHistory } from "react-router-dom";

const EditProduct = () => {

    const history = useHistory();
    const ctx = useContext(AuthContext);
    const {id} = useParams();
    const [products, setProducts] = useState([]);
    const [product, setProduct] = useState({});
    const initialValues = {
        name: '',
        description: '',
        categoryId: '',
        price: ''
    }
    const [values, setValues] = useState(initialValues);
    const request = `products/${id}`;
    const headers = {
        Accept: "text/plain",
        Authorization: `${ctx.tokenType} ${ctx.accessToken}`
    }

    const headersPut = {
        Accept: "text/plain",
        Authorization: `${ctx.tokenType} ${ctx.accessToken}`,
        "Content-Type": "application/json"
    }

    useEffect(()=>{
        
        const fetchProducts = async () => { 
            const response = await fetchFunction(request, 'GET', headers); 
            const data = await response.data;
            setProduct(data);

            const secondResponse = await fetchFunction('products', 'GET', headers);
            const items = await secondResponse.items;
            setProducts(items);
        }
        fetchProducts();
    }, [])

    const handleSelect = (event) => {
        const tmpCategory = products.find(item => item.category === event.target.value)
        setValues({
            ...values, 
            categoryId: tmpCategory.categoryId
        })
    }

    const handleSubmit = async () => {
        const response = await fetchFunction(request, 'PUT', headersPut, JSON.stringify(values));
        history.replace('/products');
    }

    return(
        <EditForm 
            products={products ? products : []}
            name = {product.name}
            price = {product.price}
            description = {product.description}
            values={values}
            setValues={setValues}
            handleSelect={handleSelect}
            handleSubmit={handleSubmit}
        />
    );
}

export default EditProduct;