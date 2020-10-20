import React from 'react';
import UserNav from '../components/nav/UserNav'

const WishList = () => (
    <div className='container-fluid'>
        <div className='row'>
            <div className='col-md-2'>
                <UserNav/>
            </div>
            <div className='col'>
                wishlist more content
            </div>
        </div>
    </div>
)

export default WishList