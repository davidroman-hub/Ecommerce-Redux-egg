import React from 'react';
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';

//Auth
import  Login  from './auth/Login';
import  Signin  from './auth/Signin';

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
                <Route exact path='/' component={Home}/>
                <Route exact path='/login' component={Login}/>
                <Route exact path='/Signin' component={Signin}/>
                <Redirect to='/' /> 
              </Switch>
          </div>
        </Router>
    </>
  )
}
export default App;
