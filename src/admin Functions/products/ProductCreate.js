
import React,{useState,useEffect} from 'react'
import AdminNav from '../../components/nav/AdminNav';
import Swal from 'sweetalert2';
import { useSelector } from 'react-redux'
import { createProduct } from '../../functions/product';


const ProductCreate = () => {

    const initialState = {
        title:'Asus Tuf',
        description:'the best ',
        price:'200',
        categories:[],
        category:'',
        subcategories:[],
        shipping:'Yes',
        quantity:'200',
        images:[],
        brands:['Apple', 'Samsung','Microsoft', 'Lenovo','Asus'],
        colors:['Black', 'Brown','Silver', 'White'],
        color:'Black',
        brand:'Asus'
    }

    const [values, setValues] = useState(initialState)
    
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

    const handleChange = (e) => {
        setValues({...values, [e.target.name]: e.target.value})
        //console.log(e.target.name, '-------', e.target.value)
    }

    //redux to take the state from user we need the token

    const {user} = useSelector((state) => ({...state}))

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(values)
        createProduct(values, user.token )
        .then( res => {
            console.log(res)
            // Swal.fire({
            //     title:`${res.data.title} is created`,
            //     icon:'success'
            // })
            window.alert(`" ${res.data.name} " is created`);
            window.location.reload();
        })
        .catch( (err) => {
            console.log(err)
            //if (err.response.status === 400)
            Swal.fire({
                title:err.response.data.err,
                icon:'error'
            }) 
        })
    }

    const ProductFormExec = () => (
        
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
    )


    const ProductForm = () => (
        <div className='container-fluid'>
            <div className='row'>
                <div className='col-md-2'>
                    <AdminNav/>
                </div>
                <div className='col mt-5'>
                    <h4 className='text-center'>Product Create </h4>
                    <br/>
                    <div className='col-md-6 offset-md-3 mt-3'>
                            {ProductFormExec()}                        
                    </div>
                    
                    
                </div>
            </div>
        </div>
    )


    return (
        <>
            {ProductForm()}
        </>
    )
}


export default ProductCreate
