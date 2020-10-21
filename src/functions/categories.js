import axios from 'axios'; 

///APi Request 

//Create Category

export const createCategory = async ( category,authtoken) =>
    await axios.post(`${process.env.REACT_APP_API}/category`, category, {
        headers:{
            authtoken,
        }
    });


//List All the categories

export const getCategories = async () => await axios.get(`${process.env.REACT_APP_API}/categories`);

//Get single category

export const getCategory = async (slug) =>
    await axios.get(`${process.env.REACT_APP_API}/category/${slug}`);

//Delete Category

export const removeCategory = async (slug, authtoken) =>
    await axios.delete(`${process.env.REACT_APP_API}/category/${slug}`,{
        headers:{
            authtoken,
        }
    });


//Update Category

    export const updateCategories = async (slug, category ,authtoken) =>
    await axios.put(`${process.env.REACT_APP_API}/category/${slug}`,category,{
        headers:{
            authtoken,
        }
    });



// export const createOrUpdateUser = async (authtoken) => {
//     return await axios.post(`${process.env.REACT_APP_API}/create-or-update-user`, 
//         {},
//             { 
//                 headers:{
//                     authtoken,
//             }
//     });
// };