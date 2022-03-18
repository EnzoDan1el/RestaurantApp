import CategoryForm from "./Forms/CategoryForm";
import {useState, useEffect, useContext} from 'react';
import { fetchFunction } from "../utils/fetch-data";
import AuthContext from "../context-store/authentication-ctx";
import { useHistory } from "react-router-dom";

const NewCategory = () => {
    const ctx = useContext(AuthContext);
    const history = useHistory();
    const [categoryName, setCategoryName] = useState('');
    const [parentId, setParentId] = useState();
    const [categories, setCategories] = useState([]);

    const headers = {
        Accept: "text/plain",
        Authorization: `${ctx.tokenType} ${ctx.accessToken}`
    }

    const headersPost = {
        Accept: "text/plain",
        Authorization: `${ctx.tokenType} ${ctx.accessToken}`,
        "Content-type": "application/json"
    }

    useEffect(()=>{
        const fetchData = async () => {
            const response = await fetchFunction('categories', 'GET', headers);
            const {data} = await response
            setCategories(data);
        }

        fetchData()
    })

    const handleSelect = (event) => {
        setParentId(event.target.value);
    }

    const handleSubmit = () => {
        let body;
        if(parentId){
            body = {
                "name": categoryName,
                "parentId": parentId
            }
        }else {
            body = {
                "name": categoryName
            }
        }
        fetchFunction('categories', 'POST', headersPost, JSON.stringify(body))
        setTimeout(()=>{
            history.replace('/categories');
        }, 500);
    }
    return(
        <CategoryForm 
            title='Add new category'
            categories={categories}
            handleSelect={handleSelect}
            categoryName={categoryName}
            setCategoryName={setCategoryName}
            handleSubmit={handleSubmit}
        />
    )
}

export default NewCategory;