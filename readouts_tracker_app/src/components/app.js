import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import RegistrationForm from '../containers/registrationForm';
import Category from './category';

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
              component={Category}
            />
          </Switch>
        </Router>
      </div>
    )
  }
}

export default App