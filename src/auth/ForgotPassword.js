import React,{useState,useEffect} from 'react'
import {auth} from '../firebase';
//import {toast, ToastContainer} from 'react-toastify';
import Swal from "sweetalert2";
import {useSelector} from 'react-redux'; // if the user is ready login i dont want to he can access to this component



const ForgotPassword = ({history}) => {


    const [email, setEmail] = useState('')
    const [loading, setLoading] = useState(false)


    const handleSubmitForgot = (e) => {
        e.preventDefault()
    }

    const forgotPasswordForm = () => (
        <form onSubmit={handleSubmitForgot}>
            <input  type='email' 
                    className='form-control'
                    value={email}
                    onChange={(e) => setEmail (e.target.value)}
                    placeholder='Type your E-mail for recover your password'
                    autoFocus
                    />
                    <br/>
                    <button className='btn btn-raised' disabled={!email} >Submit</button>
                    <br/>
        </form>
    )



    return (
        <div className='container col-md-6 offset-md-3 p-5'>
            { loading ? <h3 className='text-danger'>Loading..</h3> : <h3>Forgot Password</h3> }
            {forgotPasswordForm()}
        </div>
    )
}


export default ForgotPassword