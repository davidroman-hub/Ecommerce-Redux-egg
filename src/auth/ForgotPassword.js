import React,{useState,useEffect} from 'react'
import {auth} from '../firebase';
//import {toast, ToastContainer} from 'react-toastify';
import Swal from "sweetalert2";
import {useSelector} from 'react-redux'; // if the user is ready login i dont want to he can access to this component



const ForgotPassword = ({history}) => {


    const [email, setEmail] = useState('')
    const [loading, setLoading] = useState(false)

    const {user} = useSelector( state => ({...state}));

    useEffect(() => {
        if(user && user.token) {
            history.push('/');
            }
        },[user,history])

    const handleSubmitForgot = async (e) => {
        e.preventDefault()
        setLoading(true)
        const config = {
            url: process.env.REACT_APP_FORGOT_PASSWORD_REDIRECT,
            handleCodeInApp: true,
        };
        await auth.sendPasswordResetEmail(email, config)
        .then(() => {
            setEmail('')
            setLoading(false)
            Swal.fire({ title:'Check your E-mail to password reset Link',
                icon:'success'
                });
        })
        .catch((error) => {
            setLoading(false);
            Swal.fire({ title:error.message,
                icon:'error'
                });
        })
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