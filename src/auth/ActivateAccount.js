import React,{useState,useEffect} from 'react'
import {auth} from '../firebase';
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const ActiveAccount = ({history}) => {

    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')

    //props.history


    const handleSubmit = async (e) => {
        //
    };


//we gonna activate account from the E-mail saved in the local Storage
// we want to take him using useEffect

    useEffect(() => {
        //console.log(window.localStorage.getItem('emailForRegistration')) // <-- to se the email in the console from localStorage
        setEmail(window.localStorage.getItem('emailForRegistration'))// to set the email from local storage

    }
    , [])

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
