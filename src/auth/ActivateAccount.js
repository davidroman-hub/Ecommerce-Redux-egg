import React,{useState,useEffect} from 'react'
import {auth} from '../firebase';
//import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from "sweetalert2";
import {useDispatch, 
    //useSelector
} from 'react-redux';
import {createOrUpdateUser} from '../functions/auth';

const ActiveAccount = ({history}) => {

    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')

    //const {user} = useSelector( state => ({...state}));
    let dispatch = useDispatch();

    //props.history

//we gonna activate account from the E-mail saved in the local Storage
// we want to take him using useEffect

const  UrlLink = window.location.href


    useEffect(() => {
        //console.log(window.localStorage.getItem('emailForRegistration')) // <-- to se the email in the console from localStorage
        //console.log(UrlLink)
        setEmail(window.localStorage.getItem('emailForRegistration'))// to set the email from local storage
        
    }
    , [history])

     //We need to do the request to API to Register Successfully

    
    
    const handleSubmit = async (e) => {
        e.preventDefault()

        // validation

        if(!email || !password ){
            Swal.fire({ title:'E-mail and Password is Required',
                icon:'error'
                });
                return;
        }
        if(password.length < 6 ){
            Swal.fire({ title:'Password must have at least 6 characters long',
                icon:'error'
                });
                return;
        }


        try {
            // method to the google APi
            const result = await auth.signInWithEmailLink(
                email,
                UrlLink
                );
                //console.log(result) // <-- check in the console when you register if emailVerified = true
                if(result.user.emailVerified){
                    // if is verified update this with the password
                    // part1 remove user email from local storage
                        window.localStorage.removeItem('emailForRegistration');
                    //part2 get user id Token
                        let user = auth.currentUser
                        await user.updatePassword(password); //<== and we update the password with this method
                        const idTokenResult = await user.getIdTokenResult()
                     //redux store   
                    console.log('user', user, ' idTokenResult', idTokenResult)
                    
                    createOrUpdateUser(idTokenResult.token)
                        .then((res) => {
                            //now we are bringing all the info from the backend
                            dispatch({
                                type:'LOGGED_IN_USER',
                                payload:{
                                    name:res.data.name,
                                    email:res.data.email,
                                    token:idTokenResult.token,
                                    role:res.data.role,
                                    _id:res.data._id
                            }
                        })
                        //console.log(result)
                    })
                .catch((err) => console.log(err));
                        
                        //part3 Redirect
                        history.push('/')
                    }
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
                {/* <ToastContainer/> */}
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
