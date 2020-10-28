import axios from 'axios'; 

///APi Request 

//Create Category

export const createSubCategory = async ( subCategory,authtoken) =>
    await axios.post(`${process.env.REACT_APP_API}/sub`, subCategory, {
        headers:{
            authtoken,
        }
    });


//List All the categories

export const getSubCategories = async () => await axios.get(`${process.env.REACT_APP_API}/subs`);

//Get single category

export const getSubCategory = async (slug) =>
    await axios.get(`${process.env.REACT_APP_API}/sub/${slug}`);

//Delete Category

export const removeSubCategory = async (slug, authtoken) =>
    await axios.delete(`${process.env.REACT_APP_API}/sub/${slug}`,{
        headers:{
            authtoken,
        }
    });


//Update Category

export const updateSubCategory = async (slug, sub, authtoken) =>
await axios.put(`${process.env.REACT_APP_API}/sub/${slug}`, sub, {
  headers: {
    authtoken,
  },
});

