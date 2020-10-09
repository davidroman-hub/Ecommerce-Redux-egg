import React from 'react';
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';

//Auth
import { Login } from './auth/Login';
import { Signin } from './auth/Signin';

const App = () => {
  return(
    <>
        <Router>
          <div>
            <Switch>
              <Route exact path='/login' component={Login}/>
              <Route exact path='/Signin' component={Signin}/>
              <Redirect to='/login' /> 
            </Switch>
          </div>
        </Router>
    </>
  )
}
export default App;
