import classes from './EditForm.module.css';

const EditForm = ({
        title,
        name, 
        products, 
        description,
        price,
        handleSelect, 
        values, 
        setValues,
        handleSubmit
    }) => {

    return(
        <div className={classes['form-container']}>
            <h1>{title}</h1>
            <hr/>
            <form onSubmit={handleSubmit}>
                <label>Product</label>
                <input 
                    type='text'
                    placeholder={name ? name : ''}
                    value={values.name}
                    onChange={(e) => setValues({...values, name: e.target.value})}
                />
                <label>Category</label>
                <select className={classes['select-form']} onChange={handleSelect}>
                    <option value=''>Select..</option>
                    {products.map(product => (
                        <option value={product.category}>{product.category}</option>
                    ))}
                </select>
                <label>Description</label>
                <textarea 
                    placeholder={description} 
                    rows='4' 
                    cols='52'
                    value={values.description}
                    onChange={(e) => setValues({...values, description: e.target.value})}
                />
                <label>Price</label>
                <input 
                    placeholder={price} 
                    type='number' 
                    min='1' 
                    step="0.01"
                    value={values.price}
                    onChange={(e) => setValues({...values, price: e.target.value})}
                />
                <div className={classes['edit-save']}>
                    <button>Save</button>
                </div>
            </form>
        </div>
    )
}

export default EditForm;