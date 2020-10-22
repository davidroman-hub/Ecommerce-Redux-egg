import React from 'react';
import AdminNav from '../../components/nav/AdminNav';
const SubCategoryUpdate = () => {

    const SubCategoryForm = () => (
        <div className='container-fluid'>
            <div className='row'>
                <div className='col-md-2'>
                    <AdminNav/>
                </div>
                <div className='col-md-10'>
                    <h1> Sub category update</h1>
                </div>
            </div>
        </div>
    )

    return (
        <>
            {SubCategoryForm()}
        </>
    )
}

export default SubCategoryUpdate
