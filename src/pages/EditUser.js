import { fetchFunction } from "../utils/fetch-data";
import { useParams } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import AuthContext from '../context-store/authentication-ctx';
import Form from "./Forms/Form";
import { useHistory } from "react-router-dom";
import { emailValidation, passwordValidation } from "../utils/input-validators";

const EditUser = () => {
    const initialValues = {
        name: '',
        email: '',
        password: '',
    }
    const history = useHistory();
    const ctx = useContext(AuthContext);
    const [data, setData] = useState(initialValues);
    const [values, setValues] = useState(initialValues);
    const [role, setRole] = useState('');
    const [error, setError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [nameError, setNameError] = useState('');
    const { id } = useParams();
    const body = new FormData();

    const request = `users/${id}`
    const headers = {
        Accept: "text/plain",
        Authorization: `${ctx.tokenType} ${ctx.accessToken}`
    }
    const headersPut = {
        Accept: "text/plain",
        Authorization: `${ctx.tokenType} ${ctx.accessToken}`,
        "Content-Type": "multipart/form-data"
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
        const validEmail = values.email.trim().length > 0 ? 
            emailValidation(values.email) : 
            setEmailError('Email can not be empty');
        const validPassWord = passwordValidation(values.password) ? 
            true : setPasswordError('Password needs at least 4 characters')
         
        const validName = values.name.trim().length > 0 ?
            true: setNameError('Name can not be empty');

        const validForm = validEmail && validPassWord && validName;

        if (validForm) {
            body.append("Name", values.name);
            body.append("Email", values.email);
            body.append("Role", role);
            body.append("Password", values.password);

            const response = await fetchFunction('users', 'PUT', headersPut, body);

            if(typeof(response) === 'string'){
                setError(response);
            }
            
            history.replace('/users');
        }
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
            emailError={emailError}
            password={passwordError}
            error={error}
        />
    );
}

export default EditUser;