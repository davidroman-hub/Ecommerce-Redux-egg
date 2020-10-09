import React,{useState} from 'react'


const Register = () => {

    const [email,setEmail] = useState('')


    const handleSubmit = () => {
        //
    }


    const registerFormExec = () => (
        <form onSubmit = {handleSubmit}> 
            <input type='email' 
                className='form-control'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoFocus
                />
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
