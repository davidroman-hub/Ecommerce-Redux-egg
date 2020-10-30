
import React,{useState,useEffect} from 'react'
import AdminNav from '../../components/nav/AdminNav';
import Swal from 'sweetalert2';
import { useSelector } from 'react-redux'
import { createProduct } from '../../functions/product';
import ProductCreateForm from '../../components/forms/ProductCreateForm';
import { getCategories } from '../../functions/categories';

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
    
    const [categories, setCategories] = useState([]);

    const loadCategories = () => {
        getCategories().then((c) => { setValues({...values, categories: c.data})})
    }

    useEffect(() => {
        loadCategories()
    },[])

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
            window.alert(`" ${res.data.title} " is created`);
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
                            <ProductCreateForm  
                                handleSubmit={handleSubmit} 
                                handleChange={handleChange}
                                values={values}
                                />                  
                    </div>
                    
                    
                </div>
            </div>
        </div>
    )


    return (
        <>
            {ProductForm()}
            {JSON.stringify(values.categories)}
        </>
    )
}


export default ProductCreate
