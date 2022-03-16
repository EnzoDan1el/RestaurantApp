import classes from './Form.module.css';

const Form = (props) => {
    return(
        <div className={classes['new-user']}>
            <div className={classes['new-user-title']}>
                <h1>{props.title}</h1>
                <hr/>
            </div>
            <form onSubmit={props.handleSubmit}>

                <label className={classes['user-label']} htmlFor="role">Role</label>
                <select className={classes.select} value={props.role} onChange={props.handleSelect}>
                    <option value={''}>Select...</option>
                    <option value={'Waiter'}>Waiter</option>
                    <option value={'Admin'}>Admin</option>
                </select>

                <label className={classes['user-label']} htmlFor="name">Name</label>
                <input 
                    id="name" 
                    type="text"
                    placeholder={props.data ? props.data.name : 'name'}
                    onChange={(e) => props.setValues({...props.values, name: e.target.value})} 
                />

                {props.nameError && <p style={{color: 'red'}}>{props.nameError}</p>}

                <label className={classes['user-label']} htmlFor="email">Email</label>
                <input 
                    id="email" 
                    type="text"
                    placeholder={props.data ? props.data.email : 'email'}
                    onChange={(e) => props.setValues({...props.values, email: e.target.value})}
                />

                {props.emailError && <p style={{color: 'red'}}>{props.emailError}</p>}

                <label className={classes['user-label']} htmlFor="password">Password</label>
                <input 
                    id="password" 
                    type="password"
                    placeholder='password'
                    onChange={(e) => props.setValues({...props.values, password: e.target.value})}
                />

                {props.passwordError && <p style={{color: 'red'}}>{props.passwordError}</p>}

                {props.error && <p style={{color: 'red'}}>{props.error}</p>}
                
                <div className={classes['save-container']}>
                    <button className={classes.save}>Save</button>
                </div>
            </form>
        </div>
    )
}

export default Form;