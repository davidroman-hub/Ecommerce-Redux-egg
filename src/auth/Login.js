import React,{useState} from 'react'
import {auth} from '../firebase';
import { Button } from 'antd';
import { MailOutlined } from "@ant-design/icons";
import 'react-toastify/dist/ReactToastify.css';
import Swal from "sweetalert2";

const Login = () => {

    const [email,setEmail] = useState('healinglovenotif@gmail.com');
    const [password,setPassword] = useState('sandra7373')


    const handleSubmit = async (e) => {
        e.preventDefault();
        //console.table(email,password)
        try {
            const result = auth.signInWithEmailAndPassword(email,password)
            console.log(result)
        } catch (error) {
            
        }
        
    };

    //REMEMBER TO HABILITE FROM GOOGLE CONSOLE THE LOGINS!!


    const loginFormExec = () => (
        <form onSubmit = {handleSubmit}> 
            <div className='form-group'>
                <input 
                    type='email' 
                    className='form-control'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder='Your E-mail'
                    autoFocus
                    />
            </div>
            <div className='form-group'>
                <input 
                    type='password' 
                    className='form-control'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder='Your Password'
                    />
            </div>            
                <br/>
                <Button
                    onClick={handleSubmit}
                    type='primary'
                    className='mb-3'
                    block
                    shape='round'
                    icon={<MailOutlined/>}
                    size='large'
                    disabled={!email || password.length < 6 }
                    > 
                    Login with E-mail/Password
                </Button>
        </form>
    )



const registerForm = () => (
    <div className='container p-5'>
        <div className='row'>
            <div className=' col-md-6 offset-md-3'>
                <h4>Login</h4>
                {/* <ToastContainer/> */}
                {loginFormExec()}
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

export default Login
