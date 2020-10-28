import React,{useState,useEffect} from 'react'
import AdminNav from '../../components/nav/AdminNav';
import Swal from 'sweetalert2';
import { useSelector } from 'react-redux'
import { 
            updateSubCategory, 
            getSubCategory
        } from '../../functions/subCategories';
import {getCategories} from '../../functions/categories';
import CategoryFormReusable from '../../components/forms/CategoryForm';
//import {useParams} from 'react-router-dom'; // this hook can give us the info in match


const SubCategoryUpdate = ({history, match}) => {

    const {user} = useSelector(state => ({...state}));
    const [ categories, setCategories ]= useState([]); // With this you can update the parent category for the child category
    const [name, setName] = useState('');
    const [parentCategory, setParent] = useState('')
    const [loading, setLoading] = useState(false);;
    
    //let {slug} = useParams(); // and with this we can see the slug as well is an alternative to use 'match'

    const loadCategories = () => {
        getCategories().then((c) => setCategories(c.data));
    }

    const loadSubCategory = () => {
        getSubCategory(match.params.slug).then((s) => { 
            setName(s.data.name) 
            setParent(s.data.parentCategory)
        });
        
    }

    useEffect(() => {
        //console.log(slug)
        //console.log(match.params.slug) // <== Remember this to see what we have 
        loadCategories()
        loadSubCategory()
    },[])

    const handleSubmit = (e) => {
        //
        e.preventDefault()
        //console.log(name)
        setLoading(true)
        // Remember to check every argument taht you send it , in this case we needed slug because we didnt have before
        // and we didnt updated
        updateSubCategory(match.params.slug,{name, parentCategory}, user.token)
        .then(res => {
            console.log(res)
            setLoading(false)
            setName('')
            Swal.fire({
                title:`${res.data.name} is updated`,
                icon:'success'
            });
            history.push('/admin/subcategory');
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


/////////////////////////////


    const renderingCategories = () => (
        <>
            <div className="form-group">
            <label>Parent category</label>
            <select
                name="category"
                className="form-control"
                onChange={(e) => setParent(e.target.value)}
            >
            <option>Please select</option>
                {categories.length > 0 &&
                    categories.map((c) => (
                    <option key={c._id} value={c._id} selected={c._id === parentCategory}>
                        {c.name}
                    </option>
                ))}
            </select>
            </div>
        </>
    )

    const SubCategoryForm = () => (
        <div className='container-fluid'>
            <div className='row'>
                <div className='col-md-2'>
                    <AdminNav/>
                </div>
                <div className='col'>
                    {loading ? <><i className="fas fa-spinner fa-pulse"/> <p>Loading...</p></>: <h4>Update Sub Category</h4>}
                    <br/>
                    {renderingCategories()}
                    <br/>
                    <CategoryFormReusable handleSubmit={handleSubmit} name ={name} setName={setName} /> 
                    <hr/>
                </div>
            </div>
        </div>
    )
    
    return (
        <>
            {SubCategoryForm()}
        </>
    )
}

export default SubCategoryUpdate
