import React,{useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom';

const LoadingToRedirect = () => {
    const [count, setCount] = useState(3)
    let history = useHistory()

    useEffect(() => {
        const interval = setInterval(() => {
            //dicrement coutn
            setCount((currentCount) => --currentCount);
        },1000);
        //Redirect onbce count is equal to 0
        count === 0 && history.push('/');
        //cleanup
        return () => clearInterval(interval)
    },[count, history])

    return (
        <div className='container p-5 text-center'>
            <h3 className='text-danger'>You are not logged!</h3>
            <p> Redirecting you in <i className="fas fa-spinner fa-pulse"/> {count}  seconds..</p>
        </div>
    )
}

export default LoadingToRedirect