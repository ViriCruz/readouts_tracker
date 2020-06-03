import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom'
import User from '../api/registerUser'
import { getUser, getUserPending, getUserError } from '../reducers/userReducer';

const mapDispatchToProps = dispatch => bindActionCreators({
  register: User.registerUser,
}, dispatch);

const mapStateToProps = state => ({
  user: {
    error: getUserError(state.user),
    data: getUser(state.user),
    pending: getUserPending(state.user)
  }
})

export class RegistrationForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      password_confirmation: "",
      registrationErrors: ""
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(event) {
    const { firstName, lastName, email, password, password_confirmation } = this.state;
    const { register } = this.props;
    const data = {
      user: {
        first_name: firstName,
        last_name: lastName,
        email: email,
        password: password,
        password_confirmation: password_confirmation
      }
    }

    register(data)

    event.preventDefault();
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }


  render () {
    const { user } = this.props
    const { data } = user
    if(data.auth_token) return <Redirect to='/categories' />
    return (
      <div className="vh-100 d-flex flex-column align-items-center justify-content-center">
        <div className="d-flex justify-content-center">
          <h1 className="h3">Sign Up Form</h1>
        </div>
        <form 
          className="d-flex flex-column justify-content-center align-items-center" 
          onSubmit={this.handleSubmit}
        >
          <div className="form-group col-sm-12">
            <input
              className="form-control"
              type="text"
              name="firstName"
              placeholder="Your first name"
              value={this.state.firstName}
              onChange={this.handleChange}
              required
            />
          </div>
          <div className="form-group col-sm-12">
            <input
              className="form-control"
              type="text"
              name="lastName"
              placeholder="Your last name"
              value={this.state.lastName}
              onChange={this.handleChange}
              required
            />
          </div>

          <div className="form-group col-sm-12">
            <input
              className="form-control"
              type="email"
              name="email"
              placeholder="Email"
              value={this.state.email}
              onChange={this.handleChange}
              required
            />
          </div>

          <div className="form-group col-sm-12">
            <input
              className="form-control"
              type="password"
              name="password"
              placeholder="Password"
              value={this.state.password}
              onChange={this.handleChange}
              required
            />
          </div>

          <div className="form-group col-sm-12">
            <input
              className="form-control"
              type="password"
              name="password_confirmation"
              placeholder="Password confirmation"
              value={this.state.password_confirmation}
              onChange={this.handleChange}
              required
            />
          </div>

          <div className="form-group row">
            <div className="col-sm-10">
              <button type="submit" className="btn btn-primary">Register</button>
            </div>
          </div>
          
        </form>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationForm);