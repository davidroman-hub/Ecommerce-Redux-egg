import React,{useState} from 'react'
import {auth} from '../firebase';
import { Button, message } from 'antd';
import { MailOutlined } from "@ant-design/icons";
import 'react-toastify/dist/ReactToastify.css';
import {useDispatch} from 'react-redux';

import Swal from "sweetalert2";

const Login = ({history}) => {

    const [email,setEmail] = useState('jobroman83@gmail.com');
    const [password,setPassword] = useState('123456');
    const [loading,setLoading] = useState(false);

    let dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)
        //console.table(email,password)
        try {
            const result = await auth.signInWithEmailAndPassword(email,password)
            const {user} = result
            const idTokenResult = await user.getIdTokenResult()
            dispatch({
                type:'LOGGED_IN_USER',
                payload:{
                    email:user.email,
                    token:idTokenResult.token,
                }
            })
            //console.log(result)
            history.push('/')
        } catch (error) {
            Swal.fire({ title:error.message,
                icon:'error'
                });
                setLoading(false)
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
