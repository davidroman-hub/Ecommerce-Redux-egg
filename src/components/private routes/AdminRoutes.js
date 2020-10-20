import React,{ useEffect, useState } from 'react';
import { Route } from 'react-router-dom';
import { useSelector }from 'react-redux';
import LoadingToRedirect from './LoadingToRedirect';
import { currentAdmin } from '../../functions/auth';


const AdminRoute = ({children, ...rest}) => {
    const { user } = useSelector((state) => ({...state})); // we have to take the user from the state in redux to used and redirect
    const [ok, setOk] = useState(false)
    //check if we have user & user token

    // to bring the admin in use Effect
    useEffect(() => {
        if(user && user.token){
            currentAdmin(user.token)
            .then( res => {
                console.log('CURRENT ADMIN RES', res)
                setOk(true)
            })
            .catch( err => {
                console.log('ADMIN ROUTE ERRO',err)
                setOk(false)
            })
        }
    }, [user])

    return ok ? <Route {...rest}  />
        :
        (
        <LoadingToRedirect/>
    )

}   

export default AdminRoute