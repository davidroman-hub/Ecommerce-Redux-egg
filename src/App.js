import React,{useEffect} from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {currentUser} from './functions/auth';
//Auth
import  Login  from './auth/Login';
import  Register  from './auth/Register';
import ActiveAccount from './auth/ActivateAccount';
import {auth} from './firebase'; 
import ForgotPassword from './auth/ForgotPassword';


//Public
import  Home from './userInterface/Home';
import Header from './components/nav/Header';

// User

import UserDashboard from './userInterface/History';
import UserRoute from './components/private routes/UserRoute';
import Password from './userInterface/Password';
import WishList from './userInterface/Wishlist';

//Admin

import AdminRoute from './components/private routes/AdminRoutes';
import AdminDashboard from './adminInterface/AdminDashboard';

import CategoryCreate from './admin Functions/category/CategoryCreate';
import CategoryUpdate from './admin Functions/category/CategoryUpdate';

import SubCategoryCreate from './admin Functions/subCategory/SubCategoryCreate';
import SubCategoryUpdate from './admin Functions/subCategory/SubCategoryUpdate';

const App = () => {

  const dispatch = useDispatch()

  // To check firebase State
    
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if(user){
        const idTokenResult = await user.getIdTokenResult()
        console.log('user', user)
          currentUser(idTokenResult.token)
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
        }
    } )

    //Clean up

    return () =>  unsubscribe();

  }, [dispatch])

  return(
    <>
        <Router>
          <div>
            <Header/>
              <Switch>
                
                {/* Public */}
                <Route exact path='/' component={Home}/>
                <Route exact path='/register' component={Register}/>
                <Route exact path='/login' component={Login}/>
                <Route exact path='/register/complete' component={ActiveAccount}/>
                <Route exact path='/forgot/password' component={ForgotPassword}/>

                {/* USER subscriber */}
                <UserRoute exact path='/user/dashboard' component={UserDashboard}/>
                <UserRoute exact path='/user/password' component={Password}/>
                <UserRoute exact path='/user/wishlist' component={WishList}/>


                {/* ADMIN LINKS */}
                <AdminRoute exact path='/admin/dashboard' component={AdminDashboard}/>

                <AdminRoute exact path='/admin/category' component={CategoryCreate}/>
                <AdminRoute exact path='/admin/category/:slug' component={CategoryUpdate}/>

                <AdminRoute exact path='/admin/subcategory' component={SubCategoryCreate}/>
                <AdminRoute exact path='/admin/subcategory/:slug' component={SubCategoryUpdate}/>
                
                {/* <Redirect to='/' />  */}
              </Switch>
          </div>
        </Router>
    </>
  )
}
export default App;
