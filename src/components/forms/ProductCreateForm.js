import React from 'react'


const ProductCreateForm = ({values, handleSubmit, handleChange}) => {

      //destructure
    
    const { title, 
        description, 
        price, 
        category,
        categories, 
        subcategories, 
        shipping, 
        quantity,
        images,
        brand,
        brands,
        colors,
        color
    } = values

    return (
        <>
            <form onSubmit={handleSubmit}>
            {/* {JSON.stringify(values)} */}
            <div className='form-group'>
                <label>Title</label>
                <input 
                    type='text'
                    name='title'
                    className='form-control'
                    value={title}
                    onChange={handleChange}
                    required
                    />
            </div>

            <div className='form-group'>
                <label>Description</label>
                <input 
                    type='text'
                    name='description'
                    className='form-control'
                    value={description}
                    onChange={handleChange}
                    required
                    />
            </div>

            <div className='form-group'>
                <label>Price</label>
                <input 
                    type='number'
                    name='price'
                    className='form-control'
                    value={price}
                    onChange={handleChange}
                    required
                    />
            </div>

            <div className='form-group'>
                <label>Shipping</label>
                    <select 
                    onChange={handleChange}
                    className='form-control'
                    value={shipping}
                    name='shipping'
                    required>
                    <option value=''>Por Favor Selecciona</option>
                    <option value='No'>No</option>
                    <option value='Yes'>Yes</option>
                </select>
            </div>


            <div className='form-group'>
                <label>Quantity</label>
                <input 
                    type='number'
                    name='quantity'
                    className='form-control'
                    value={quantity}
                    onChange={handleChange}
                    required
                    />
            </div>

            <div className='form-group'>
                {/* <label>Color</label>
                    <select
                        onChange={handleChange}
                        className='form-control'
                        value={color}
                        name='color'
                        required
                    >
                        <option >Please Select</option>
                        {colors.map( c => <option key={c} value={c}>
                            {c}
                        </option>)}
                    </select> */}

            <div className='form-group'>
                <label>Color</label>
                    <select 
                    onChange={handleChange}
                    className='form-control'
                    value={color}
                    name='color'
                    required>
                    <option >Please Select</option>
                        {colors.map( c => <option required key={c} value={c}>
                            {c}
                        </option>)}
                </select>
            </div>
            </div>

            <div className='form-group'>
                <label>Brand</label>
                    <select
                        name='brand'
                        className='form-control'
                        onChange={handleChange}
                        value={brand}
                        required
                    >
                        <option >Please Select</option>
                        {brands.map( b => <option key={b} value={b}>
                            {b}
                        </option>)}
                    </select>
            </div>

                <button className='btn btn-outline-info'>Save</button>

        </form>
        </>
    )
}

export default ProductCreateForm
