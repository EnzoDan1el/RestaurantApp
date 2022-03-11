import classes from './User.module.css';

const User = (props) => {

    return(
        <div className={classes.container}>
            <div>{props.name}</div>
            <div>{props.email}</div>
        </div>
    );
}

export default User;