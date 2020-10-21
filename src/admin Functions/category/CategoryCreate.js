import React,{useState,useEffect} from 'react'
import AdminNav from '../../components/nav/AdminNav';
import Swal from 'sweetalert2';
import { useSelector } from 'react-redux'
import { 
            createCategory, 
            getCategories, 
            removeCategory 
        } from '../../functions/categories';
import Icon from '@ant-design/icons/lib/components/Icon';

        
const CategoryCreate = () => {

    const [name, setName] = useState('')
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState([]);
    const {user} = useSelector(state => ({...state}))


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


    const showCategoryForm = () => (
        <form onSubmit={handleSubmit}>
            <div className ='form-group'>
                <label>Name</label>
                <input type='text' 
                        className='form-control' 
                        onChange={e => setName(e.target.value)} 
                        value={name}
                        autoFocus
                        required
                        />
                        <br/>
                        <button className='btn btn-outlined-primary'>Save</button>
            </div>
        </form>
    )


    const CategoryForm = () => (
        <div className='container-fluid'>
            <div className='row'>
                <div className='col-md-2'>
                    <AdminNav/>
                </div>
                <div className='col'>
                    {loading ? <><i className="fas fa-spinner fa-pulse"/> <p>Loading...</p></>: <h4>Create Category</h4>}
                    {showCategoryForm()}
                    <hr/>
                    {categories.length}
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
