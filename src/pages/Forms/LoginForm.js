import classes from './LoginForm.module.css';
import { useState, useContext } from 'react';
import { FaRegEye } from 'react-icons/fa';
import { passwordValidation, emailValidation } from '../../utils/input-validators';
import loginFetch from '../../utils/fetch-data';
import { useHistory } from 'react-router-dom';
import AuthContext from '../../context-store/authentication-ctx';

const LoginForm = () => {

    const history = useHistory();
    const ctx = useContext(AuthContext);

    const initialValues = {
        email: '',
        password: '',
    }

    const [values, setValues] = useState(initialValues)
    const [type, setType] = useState('password');
    const [passwordError, setPasswordError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [userError, setUserError] = useState('');

    const handleVisible = () => {
        const text = type === 'password' ? 'text' : 'password';
        setType(text);
    }

    const validateEmail = (email) => {
        if (email){
            if (emailValidation(email)){
                setEmailError('');
                return true;
            }else {
                setEmailError('Email Incorrect')
                return false;
            }
        }else {
            setEmailError('Email must not be empty');
            return false;
        }
    }

    const validatePassword = (password) => {
        if(password){
            if(passwordValidation(password)){
                setPasswordError('');
                return true;
            }else {
                setPasswordError('Password must contain at least 4 characters');
                return false;
            }
        }else {
            setPasswordError('Password mus not be empty input');
            return false;
        }
    }
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        const valid = validateEmail(values.email) && validatePassword(values.password);
        if (valid){
            const data = await loginFetch(values.email, values.password);
            if(typeof(data) === 'string'){
                setUserError('Bad Request');
            }else{
                ctx.login();
                ctx.roleSetter(data.role);
                ctx.accessTokenSetter(data.access_token);
                ctx.tokenTypeSetter(data.token_type);
                setUserError('');
                history.replace('/tables');
            }
        } 
    }

    return(
        <div className={classes.container}>
            <div className={classes.inner}>
                <h2>Login</h2>
                <hr />
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="email">Email address</label>
                        <input 
                            className={emailError ? `${classes.invalid}`: ''}
                            id="email" 
                            type='text' 
                            value={values.email}
                            onChange={event => setValues({...values, email: event.target.value})}
                        />
                        {emailError && <p style={{color: 'rgb(226, 21, 21)'}}>{emailError}</p>}
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <input 
                            className={passwordError? `${classes.password} ${classes.invalid}`: `${classes.password}`} 
                            id="password" 
                            type={type} 
                            value={values.password}
                            onChange={(event) => setValues({...values, password: event.target.value})}
                        />
                        <button type='button' className={classes.visible} onClick={handleVisible}>
                            <FaRegEye />
                        </button>
                        {passwordError && <p style={{color: 'rgb(226, 21, 21)'}}>{passwordError}</p>}
                    </div>
                    {userError && <p style={{color: 'red'}}>{userError}</p>}
                    <div className={classes.login}>
                        <button>Login</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default LoginForm;