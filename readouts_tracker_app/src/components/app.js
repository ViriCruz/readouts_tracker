import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import RegistrationForm from '../containers/registrationForm';

class App extends React.Component {
  render(){
    return(
      <div className="app">
        <Router>
          <Switch>
            <Route 
              exact
              path={'/'}
              component={RegistrationForm}
            />
          </Switch>
        </Router>
      </div>
    )
  }
}

export default App