import React from 'react';
import { Route, Link } from 'react-router-dom';
import { useSelector }from 'react-redux';
import LoadingToRedirect from './LoadingToRedirect';

const UserRoute = ({children, ...rest}) => {
    const { user } = useSelector((state) => ({...state})); // we have to take the user from the state in redux to used and redirect
    //check if we have user & user token
    return user && user.token ? <Route {...rest} render= {() => children} />
        :
        (
        <LoadingToRedirect/>
    )

}   

export default UserRoute