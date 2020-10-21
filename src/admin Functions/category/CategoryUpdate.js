import React,{useState,useEffect} from 'react'
import AdminNav from '../../components/nav/AdminNav';
import Swal from 'sweetalert2';
import { useSelector } from 'react-redux'
import { 
            updateCategories, 
            getCategory, 

        } from '../../functions/categories';
//import {useParams} from 'react-router-dom'; // this hook can give us the info in match


const CategoryUpdate = ({history, match}) => {

    const {user} = useSelector(state => ({...state}))
    const [name, setName] = useState('')
    const [loading, setLoading] = useState(false);
    
    //let {slug} = useParams(); // and with this we can see the slug as well is an alternative to use 'match'


    const loadCategory = () => {
        getCategory(match.params.slug).then((c) => { setName(c.data.name) })
    }

    useEffect(() => {
        //console.log(slug)
        //console.log(match)
        loadCategory()
    },[])

    const handleSubmit = (e) => {
        //
        e.preventDefault()
        //console.log(name)
        setLoading(true)
        // Remember to check every argument taht you send it , in this case we needed slug because we didnt have before
        // and we didnt updated
        updateCategories(match.params.slug,{name}, user.token)
        .then(res => {
            console.log(res)
            setLoading(false)
            setName('')
            Swal.fire({
                title:`${res.data.name} is updated`,
                icon:'success'
            });
            history.push('/admin/category');
        
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


    const renderingCategories = () => (
        <>
        Hello
        </>
    )

    const CategoryForm = () => (
        <div className='container-fluid'>
            <div className='row'>
                <div className='col-md-2'>
                    <AdminNav/>
                </div>
                <div className='col'>
                    {loading ? <><i className="fas fa-spinner fa-pulse"/> <p>Loading...</p></>: <h4>Update Category</h4>}
                    {showCategoryForm()}
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

export default CategoryUpdate
