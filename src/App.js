import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';


//Auth
import  Login  from './auth/Login';
import  Register  from './auth/Register';
import ActiveAccount from './auth/ActivateAccount';


//Public
import  Home from './userInterface/Home';
import Header from './components/nav/Header';

const App = () => {
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
