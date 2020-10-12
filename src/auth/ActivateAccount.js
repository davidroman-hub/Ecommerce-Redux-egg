import React,{useState,useEffect} from 'react'
import {auth} from '../firebase';
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from "sweetalert2";

const ActiveAccount = ({history}) => {

    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')

    //props.history

//we gonna activate account from the E-mail saved in the local Storage
// we want to take him using useEffect

const  UrlLink = window.location.href


    useEffect(() => {
        //console.log(window.localStorage.getItem('emailForRegistration')) // <-- to se the email in the console from localStorage
        //console.log(UrlLink)
        setEmail(window.localStorage.getItem('emailForRegistration'))// to set the email from local storage
        
    }
    , [])

     //We need to do the request to API to Register Successfully

    
    
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            // method to the google APi
            const result = await auth.signInWithEmailLink(
                email,
                UrlLink
                );
                console.log(result)
        } catch (error) {
            console.log(error)
            Swal.fire({ title:error.message,
                    icon:'error'

    })
        }
    };

    const accountActivaionForm = () => (
        <form onSubmit = {handleSubmit}>
            
            <input 
                type='email' 
                className='form-control'
                value={email}
                disabled
                />
                <br/>
            <input 
                type='password' 
                className='form-control'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder='Type your  Password!'
                autoFocus
                />
                <button type='submit' className='btn btn-raised mt-4'> 
                    Complete your registration
                </button>
        </form>
    )



const registerForm = () => (
    <div className='container p-5'>
        <div className='row'>
            <div className=' col-md-6 offset-md-3'>
                <h4>Active account</h4>
                <ToastContainer/>
                {accountActivaionForm()}
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

export default ActiveAccount
