import classes from './Product.module.css';

const Product = (props) => {
    return(
        <div className={classes.container}>
            <div>{props.name}</div>
            <div>{props.category}</div>
            <div>{`$${props.price}`}</div>
        </div>
    );
}

export default Product;