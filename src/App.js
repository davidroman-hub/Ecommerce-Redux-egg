import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

//Auth
import  Login  from './auth/Login';
import  Register  from './auth/Register';

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
                <Route exact path='/register' component={Register}/>
                <Route exact path='/login' component={Login}/>
                {/* <Redirect to='/' />  */}
              </Switch>
          </div>
        </Router>
    </>
  )
}
export default App;
