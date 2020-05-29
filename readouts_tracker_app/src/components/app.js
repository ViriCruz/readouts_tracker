import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import RegistrationForm from '../containers/registrationForm';
import CategoriesList from '../containers/categoriesList'
import LoginForm from '../containers/loginForm';
import Navbar from '../containers/navbar'
import ReadingContainer from '../containers/readingContainer';
import Measure from '../containers/measurements'

class App extends React.Component {
  render(){
    return(
      <Router>
        <div className="app">
          <Navbar /> 
          <Switch>
            <Route
              exact
              path={'/'}
            >
              <Redirect to='/signin' />
            </Route>
            <Route 
              exact
              path={'/signup'}
              component={RegistrationForm}
            />
            <Route 
              exact
              path={'/categories'}
              component={CategoriesList}
            />
            <Route
              exact 
              path={'/signin'}
              component={LoginForm}
            />
            <Route 
              exact
              path={'/track_reading'}
              component={ReadingContainer}
            />
            <Route
              exact
              path={'/measurements'}
              component={Measure}
            />
          </Switch>
        </div>
      </Router>
    )
  }
}

export default App