import React,{useState,useEffect} from 'react'
import AdminNav from '../../components/nav/AdminNav';
import Swal from 'sweetalert2';
import { useSelector } from 'react-redux'
import { getCategories } from '../../functions/categories';
import {EditOutlined ,  DeleteOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import CategoryFormReusable from '../../components/forms/CategoryForm';
import LocalSearch from '../../components/forms/LocalSearch';
import { createSubCategory, getSubCategories, removeSubCategory, getSubCategory } from '../../functions/subCategories';
        
const SubCategoryCreate = () => {

    const [name, setName] = useState('')
    const [loading, setLoading] = useState(false);
    const [SubCategories, setSubCategories] = useState([]);
    const [Categories, setCategories] = useState([]);
    const {user} = useSelector(state => ({...state}));
    const [category, setCategory] = useState("") // <== to create the sub category
    
    //searching filtering
    //step 1 
    const [keyword, setKeyword] = useState('')


    const loadSubCategories = () => {
        getSubCategories().then((c) => { setSubCategories(c.data) })
    }
    const loadCategories = () => {
        getCategories().then((c) => { setCategories(c.data) })
    }

    useEffect(() => {
        loadSubCategories();
        loadCategories()
    },[])

    const handleSubmit = (e) => {
        //
        e.preventDefault()
        //console.log(name)
        setLoading(true)
        // we send the category from the state to parent: remember the Schema
        createSubCategory({name, parentCategory: category }, user.token)
        .then(res => {
            console.log(res)
            setLoading(false)
            setName('')
            Swal.fire({
                title:`${res.data.name} is created`,
                icon:'success'
            })
            loadSubCategories()
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
                removeSubCategory(slug, user.token)
                .then( res => {
                    setLoading(false)
                    Swal.fire({
                        title:`${res.data.name} is deleted !`,
                        icon:'success'
                    });
                    loadSubCategories()
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


//step 4

const searched = (keyword) => (c) => c.name.toLowerCase().includes(keyword)    


//step 5 includes 'searched function' in the funtion map =>>

    const renderingSubCategories = () => (
        <>
        {SubCategories.filter(searched(keyword)).map((s) => (
            <div className='alert alert-secondary' key={s._id}>
                {s.name} <span 
                    className='btn btn-sm float-right'
                    onClick={(() => handleRemove(s.slug))}
                > <DeleteOutlined className='text-danger'/> </span> 
                <Link to={`/admin/subcategory/${s.slug}`}>
                    <span className='btn btn-sm float-right'>
                        <EditOutlined className='text-warning' />
                    </span>
                </Link>
            </div>
        ))}
        </>
    )
    const selectCategory = () => (
        <div className='form-group'>
            <label className='mb-2'>Parent Category</label>
            
                <select name='category' className='form-control' onChange={(e) => setCategory(e.target.value)} >
                    <option >Please Select</option>
                    {Categories.length > 0 && Categories.map((c) => (
                        <option key={c._id} value={c._id} >{c.name}</option>
                    ))}
                </select>    
                {/* {JSON.stringify(category)} */}
        </div>
    )


    const CategoryForm = () => (
        <div className='container-fluid'>
            <div className='row'>
                <div className='col-md-2'>
                    <AdminNav/>
                </div>
                <div className='col'>
                    {loading ? <><i className="fas fa-spinner fa-pulse"/> <p>Loading...</p></>: <h4>Create Sub Category</h4>}
                    {/* // we gona send the previous info as props! and we have to destructure in the component */}
                    <hr/>
                    {selectCategory()}
                    <hr/>
                    <CategoryFormReusable handleSubmit={handleSubmit} name ={name} setName={setName} /> 
                    <hr/>
                    {/* //Step 2 and 3 */}
                    <LocalSearch keyword={keyword} setKeyword={setKeyword} />
                    <hr/>
                    {renderingSubCategories()}
                    {/* {JSON.stringify(SubCategories)} */}
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

export default SubCategoryCreate
