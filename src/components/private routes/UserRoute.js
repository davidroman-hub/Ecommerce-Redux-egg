import React from 'react';
import { Route, Link } from 'react-router-dom';
import { useSelector }from 'react-redux';

const UserRoute = ({children, ...rest}) => {
    const { user } = useSelector((state) => ({...state})); // we have to take the user from the state in redux to used and redirect
    //check if we have user & user token
    return user && user.token ? <Route {...rest} render= {() => children} />
        :
        (
        <h1 className='text-danger'> Loading... </h1>
    )

}   

export default UserRoute