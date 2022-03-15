import { fetchFunction } from "../utils/fetch-data";
import { useParams } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import AuthContext from '../context-store/authentication-ctx';
import Form from "./Forms/Form";

const EditUser = () => {
    const initialValues = {
        name: '',
        email: '',
        password: '',
    }
    const ctx = useContext(AuthContext);
    const [data, setData] = useState(initialValues);
    const [values, setValues] = useState(initialValues);
    const [role, setRole] = useState('');
    const { id } = useParams();
    const request = `users/${id}`
    const headers = {
        Accept: "text/plain",
        Authorization: `${ctx.tokenType} ${ctx.accessToken}`
    }

    useEffect(()=>{
        const retrieveData = async () => {
            const response = await fetchFunction(request, 'GET', headers);
            setData(response);
        }

        retrieveData();
    }, [])

    const handleSelect = (event) => {
        setRole(event.target.value)
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log('hello')
        console.log(values)
    }


    return(
        <Form
            title="Edit user"
            handleSubmit={handleSubmit}
            role={role}
            handleSelect={handleSelect}
            data={data}
            values={values}
            setValues={setValues}
        />
    );
}

export default EditUser;