import React,{ useState } from 'react';
import UserNav from '../components/nav/UserNav';
import { auth } from '../firebase';
import Swal from 'sweetalert2';



const Password = () => {

    const [password,setPassword] = useState('');
    const [loading, setLoading] =useState(false);


    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        //console.log(password)
        //this gave us current user
        await auth.currentUser.updatePassword(password)
        .then(() => {
            //
            setLoading(false)
            setPassword('')
            Swal.fire(
                { title:'The password is updated!',
                icon:'success'
                }
            )
            
        })
        .catch(err => {
            setLoading(false)
            Swal.fire(
                { title:err.message,
                icon:'error'
                }
            )
        })
    }

    const PasswordForm = () => (
        <form onSubmit={handleSubmit}>
            <div className='form-group'>
                <label>Your Password</label>
                <input type='password'
                onChange={ (e) => setPassword(e.target.value)}
                className='form-control'
                placeholder='Enter new Password'
                disabled={loading}
                value={password}
                />
                <button className='btn btn-primary' disabled={!password || password.length < 6 || loading}>Submit</button>
            </div>
        </form>
    )


return(
        <div className='container-fluid'>
            <div className='row'>
                <div className='col-md-2'>
                    <UserNav/>
                </div>
                <div className='col'>
                        {loading ? <div className="fa-3x">
                            <h4>Loading</h4> 
                                <i className="fas fa-spinner fa-pulse"/>
                        </div> : <h4>Password Update</h4>}
                        {PasswordForm()}
                </div>
            </div>
        </div>
    )
}

export default Password