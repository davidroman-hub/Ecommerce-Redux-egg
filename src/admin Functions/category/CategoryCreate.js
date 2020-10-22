import React,{useState,useEffect} from 'react'
import AdminNav from '../../components/nav/AdminNav';
import Swal from 'sweetalert2';
import { useSelector } from 'react-redux'
import { 
            createCategory, 
            getCategories, 
            removeCategory 
        } from '../../functions/categories';
import {EditOutlined ,  DeleteOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import CategoryFormReusable from '../../components/forms/CategoryForm';
        
const CategoryCreate = () => {

    const [name, setName] = useState('')
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState([]);
    const {user} = useSelector(state => ({...state}))
    
    //searching filtering
    //step 1 
    const [keyword, setKeyword] = useState('')


    const loadCategories = () => {
        getCategories().then((c) => { setCategories(c.data) })
    }

    useEffect(() => {
        loadCategories();
    },[])

    const handleSubmit = (e) => {
        //
        e.preventDefault()
        //console.log(name)
        setLoading(true)
        createCategory({name}, user.token)
        .then(res => {
            console.log(res)
            setLoading(false)
            setName('')
            Swal.fire({
                title:`${res.data.name} is created`,
                icon:'success'
            })
            loadCategories() // we need to load the categories again to recharge everything and see intantly the category 
                            // and with this we dont need to reload the page to see the new category
        })
        .catch( err => {
            console.log(err)
            setLoading(false)
            if(err.response.status === 400)
            Swal.fire({
                title:err.response.data,
                icon:'error'
            })
        })
    }

    const handleRemove = async (slug) => {
        //we gona ask to confirm

        // if(window.confirm('Delete?')){
        //     setLoading(true)
        //     removeCategory(slug, user.token)
        //     .then( res => {
        //         setLoading(false)
        //         Swal.fire({
        //             title:`${res.data.name} is deleted !`,
        //             icon:'success'
        //         })
        //     })
        //     .catch( err => {
        //         console.log(err)
        //         setLoading(false)
        //         if(err.response.status === 400)
        //         Swal.fire({
        //             title:err.response.data,
        //             icon:'error'
        //         })
        //     })
        // }

        Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            }).then((result) => {
            if (result.isConfirmed) {
                removeCategory(slug, user.token)
                .then( res => {
                    setLoading(false)
                    Swal.fire({
                        title:`${res.data.name} is deleted !`,
                        icon:'success'
                    });
                loadCategories() /// <== and here the same if not we need to reload the page to see the results    
                })
                .catch( err => {
                    console.log(err)
                    setLoading(false)
                    if(err.response.status === 400)
                    Swal.fire({
                        title:err.response.data,
                        icon:'error'
                    })
                })
            }
        })
    }


/////////////////////////////

//Step 2
const searchingKeyword = () => (
    <input type='search'
    placeholder='Search Something'
    value={keyword}
    onChange={handleSearchKeyword}
    className='form-control mb-5'
    />
)


//step 3

const handleSearchKeyword = (e) => {
    e.preventDefault()
    setKeyword(e.target.value.toLowerCase())
}


//step 4

const searched = (keyword) => (c) => c.name.toLowerCase().includes(keyword)    


//step 5 includes 'searched function' in the funtion map =>>

    const renderingCategories = () => (
        <>
        {categories.filter(searched(keyword)).map((c) => (
            <div className='alert alert-secondary' key={c._id}>
                {c.name} <span 
                    className='btn btn-sm float-right'
                    onClick={(() => handleRemove(c.slug))}
                > <DeleteOutlined className='text-danger'/> </span> 
                <Link to={`/admin/category/${c.slug}`}>
                    <span className='btn btn-sm float-right'>
                        <EditOutlined className='text-warning' />
                    </span>
                </Link>
            </div>
        ))}
        </>
    )

    

    const CategoryForm = () => (
        <div className='container-fluid'>
            <div className='row'>
                <div className='col-md-2'>
                    <AdminNav/>
                </div>
                <div className='col'>
                    {loading ? <><i className="fas fa-spinner fa-pulse"/> <p>Loading...</p></>: <h4>Create Category</h4>}
                    {/* // we gona send the previous info as props! and we have to destructure in the component */}
                    <hr/>
                    <CategoryFormReusable handleSubmit={handleSubmit} name ={name} setName={setName} /> 
                    <hr/>
                    {searchingKeyword()}
                    <hr/>
                    {renderingCategories()}
                </div>
            </div>
        </div>
    )
    
    return (
        <>
            {CategoryForm()}
        </>
    )
}

export default CategoryCreate
