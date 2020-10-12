import React,{useEffect} from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import {useDispatch} from 'react-redux';

//Auth
import  Login  from './auth/Login';
import  Register  from './auth/Register';
import ActiveAccount from './auth/ActivateAccount';
import {auth} from './firebase'; 


//Public
import  Home from './userInterface/Home';
import Header from './components/nav/Header';

const App = () => {

  const dispatch = useDispatch()

  // To check firebase State
    
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async(user) => {
      if(user){
        const idTokenResult = await user.getIdTokenResult()
        console.log('user', user)
        dispatch({
          type:'LOGGED_IN_USER',
          payload:{
            name:'David'
          }
        })
      }
    } )

    //Clean up

    return () =>  unsubscribe();

  }, [])



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
                {/* <Redirect to='/' />  */}
              </Switch>
          </div>
        </Router>
    </>
  )
}
export default App;
