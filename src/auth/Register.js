import React,{useState} from 'react'
import {auth} from '../firebase';
//import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from "sweetalert2";

const Register = () => {

    const [email,setEmail] = useState('')


    const handleSubmit = async (e) => {
        e.preventDefault();
        const config = {
            url: process.env.REACT_APP_REGISTER_REDIRECT_URL,
            handleCodeInApp: true,
        };
        await auth.sendSignInLinkToEmail(email, config);
        // toast.success(
        //     `Email is sent to ${email}. Click the link to complete your registration.`
        // );
        Swal.fire({ title:`E-mail is sent to ${email}. 
                    Follow the intructions to Register`,
                    icon:'success'
            })

        // save user email in local storage
        window.localStorage.setItem("emailForRegistration", email);
        // clear state
        setEmail("");
    };

    //REMEMBER TO HABILITE FROM GOOGLE CONSOLE THE LOGINS!!


    const registerFormExec = () => (
        <form onSubmit = {handleSubmit}> 
            <input 
                type='email' 
                className='form-control'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder='Your E-mail'
                autoFocus
                />
                <br/>
                <button type='submit' className='btn btn-raised mt-4'> 
                    Register
                </button>
        </form>
    )



const registerForm = () => (
    <div className='container p-5'>
        <div className='row'>
            <div className=' col-md-6 offset-md-3'>
                <h4>Register</h4>
                {/* <ToastContainer/> */}
                {registerFormExec()}
            </div>
        </div>
    </div>
)



    return (
        <>
            <div>
                {registerForm()}
            </div>
        </>
    )
}

export default Register
