import { useState, useContext } from 'react';
import { emailValidation, passwordValidation } from '../utils/input-validators';
import { fetchFunction } from '../utils/fetch-data';
import AuthContext from '../context-store/authentication-ctx';
import { useHistory } from 'react-router-dom';
import Form from './Forms/Form';


const NewUser = () => {

    const history = useHistory();

    const initialValues = {
        name: '',
        email: '',
        password: ''
    }

    const ctx = useContext(AuthContext);

    const body = new FormData();
    const headers = {
        Accept: "text/plain",
        Authorization: `${ctx.tokenType} ${ctx.accessToken}`
    }

    const [role, setRole] = useState('');
    const [values, setValues] = useState(initialValues);
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [nameError, setNameError] = useState('');
    const [error, setError] = useState('');

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

            const response = await fetchFunction('users', 'POST', headers, body);

            if(typeof(response) === 'string'){
                setError(response);
            }
            
            history.replace('/users');
        }
    }

    return(
        <Form
            title="Add new user"
            handleSubmit={handleSubmit}
            role={role}
            handleSelect={handleSelect}
            values={values}
            setValues={setValues}
            nameError={nameError}
            emailError={emailError}
            passwordError={passwordError}
            error={error}
        />
    );
}

export default NewUser;