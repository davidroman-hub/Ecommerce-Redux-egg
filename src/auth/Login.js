import React,{useState} from 'react'
import {auth, googleAuthProvider, facebookProvider } from '../firebase';
import { 
        Button,
        //message
    } from 'antd';
import { MailOutlined,GoogleOutlined,FacebookOutlined  } from "@ant-design/icons";
import 'react-toastify/dist/ReactToastify.css';
import {useDispatch} from 'react-redux';
import { Link } from 'react-router-dom';


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
                {/* <ToastContainer/> */}
                {/* To show loading spiner or something else.. */}
                {loading ? <h4>Loading...</h4> : <h4>Login</h4> } 
                {loginFormExec()}
                {googleButton()}
                {facebookButton()}
                <Link to='/forgot/password' className='float-right text-danger'>Forgot Password?</Link>
            </div>
        </div>
    </div>
)


const handleGoogleLogin = async () => {
    auth.signInWithPopup(googleAuthProvider)
    .then( async (result) => {
        const {user} = result
        const idTokenResult = await user.getIdTokenResult();
        dispatch({
            type:'LOGGED_IN_USER',
            payload:{
                email:user.email,
                token:idTokenResult.token,
            }
        })
        history.push('/')
    })
    .catch(err =>{  
        console.log(err) 
        Swal.fire({ title:err.message,
                icon:'error'
                });
    })
};

// remember confign the oAuth inside facebook develop

const handleFacebookLogin = async () => {
    auth.signInWithPopup(facebookProvider)
    .then( async (result) => {
        const {user} = result
        const idTokenResult = await user.getIdTokenResult();
        dispatch({
            type:'LOGGED_IN_USER',
            payload:{
                email:user.email,
                token:idTokenResult.token,
            }
        })
        history.push('/')
    })
    .catch(err =>{  
        console.log(err) 
        Swal.fire({ title:err.message,
                icon:'error'
                });
    })
    
}

const googleButton = () => {
    return(
        <Button
            onClick={handleGoogleLogin}
            type='danger'
            className='mb-3'
            block
            shape='round'
            icon={<GoogleOutlined/>}
            size='large'
            
            > 
            Login with Google
        </Button>
    )
}


const facebookButton = () => {
    return(
        <Button
            onClick={handleFacebookLogin}
            type='primary'
            className='mb-3'
            block
            shape='round'
            icon={<FacebookOutlined/>}
            size='large'
            > 
            Login with Facebook
        </Button>
    )
}


    return (
        <>
            <div>
                {registerForm()}
            </div>
        </>
    )
}

export default Login
