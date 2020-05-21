import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import RegistrationForm from '../containers/registrationForm';
import CategoriesList from '../containers/categoriesList'
import LoginForm from '../containers/loginForm';

class App extends React.Component {
  render(){
    return(
      <div className="app">
        <Router>
          <Switch>
            <Route 
              exact
              path={'/signup'}
              component={RegistrationForm}
            />
            <Route 
              path={'/'}
              component={CategoriesList}
            />
            <Route 
              path={'/signin'}
              component={LoginForm}
            />
          </Switch>
        </Router>
      </div>
    )
  }
}

export default App