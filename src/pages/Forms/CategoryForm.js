import classes from './CategoryForm.module.css';

const CategoryForm = ({
    title,
    categories, 
    name, 
    handleSelect, 
    categoryName, 
    setCategoryName,
    handleSubmit
    }) => {

    return(
        <div className={classes['cat-form-container']}>
            <h1>{title}</h1>
            <hr/>
            <form onSubmit={handleSubmit}>
                <label className={classes['cat-label']}>Category</label>

                <input 
                    type="text"
                    placeholder={name ? name : ''}
                    value={categoryName}
                    onChange={(event) => setCategoryName(event.target.value)}
                />

                <label className={classes['cat-label']}>Parent Category</label>

                <select onChange={handleSelect}>
                    <option value={0}>None</option>
                    {categories.map(item => (
                        <option value={item.id}>{item.name}</option>
                    ))}
                </select>

                <div className={classes['cat-btn-div']}>
                    <button>Save</button>
                </div>
            </form>
        </div>
    )
}

export default CategoryForm;