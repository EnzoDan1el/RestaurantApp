import { useParams } from "react-router-dom";
import CategoryForm from "./Forms/CategoryForm";
import { useEffect, useState, useContext } from "react";
import AuthContext from "../context-store/authentication-ctx";
import { fetchFunction } from "../utils/fetch-data";
import { useHistory } from "react-router-dom";

const EditCategory = () => {
    const {id} = useParams();
    const history = useHistory();
    const ctx = useContext(AuthContext);
    const request = `categories/${id}`;
    const headers = {
        Accept: "text/plain",
        Authorization: `${ctx.tokenType} ${ctx.accessToken}`
    }

    const headersPut = {
        Accept: "text/plain",
        Authorization: `${ctx.tokenType} ${ctx.accessToken}`,
        "Content-Type": "application/json"
    }

    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState();
    const [parentId, setParentId] = useState();
    const [categoryName, setCategoryName] = useState();

    useEffect(()=>{
        const fetchCategories = async () => {
            const firstResponse = await fetchFunction('categories', 'GET', headers);
            const { data } = await firstResponse;
            setCategories(data);
        }

        fetchCategories();
    }, [])
    useEffect(()=>{
        const fetchCategory = async () => {
            const secondResponse = await fetchFunction(request, 'GET', headers);
            const {data} = await secondResponse;
            setCategory(data);
        }

        fetchCategory();
    }, [])

    const handleSelect = (event) => {
        setParentId(event.target.value);
    }

    const handleSubmit = () => {
        const body = {
            "name": categoryName,
            "parentId": parentId
        }

        fetchFunction(request, 'PUT', headers, JSON.stringify(body));

        setTimeout(()=>{
            history.replace('/categories');
        }, 500)
    }

    return(
        <CategoryForm 
            title='Edit Category'
            categories={categories}
            name={category ? category.name : null}
            handleSelect={handleSelect}
            categoryName={categoryName}
            setCategoryName={setCategoryName}
            handleSubmit={handleSubmit}
        />
    )
}

export default EditCategory;