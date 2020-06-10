import React from 'react';
import {
  BrowserRouter as Router, Route, Switch, Redirect,
} from 'react-router-dom';
import RegistrationComponent from '../containers/registrationForm';
import CategoriesComponent from '../containers/categoriesList';
import LoginComponent from '../containers/loginForm';
import NavbarComponent from '../containers/navbar';
import ReadingComponent from '../containers/readingContainer';
import MeasureComponent from '../containers/measurements';

const App = () => (
  <Router>
    <div className="app">
      <NavbarComponent />
      <Switch>
        <Route
          exact
          path="/"
        >
          <Redirect to="/signin" />
        </Route>
        <Route
          exact
          path="/signup"
          component={RegistrationComponent}
        />
        <Route
          exact
          path="/categories"
          component={CategoriesComponent}
        />
        <Route
          exact
          path="/signin"
          component={LoginComponent}
        />
        <Route
          exact
          path="/track_reading"
          component={ReadingComponent}
        />
        <Route
          exact
          path="/measurements"
          component={MeasureComponent}
        />
      </Switch>
    </div>
  </Router>
);


export default App;
