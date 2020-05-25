import React from 'react';
import { Link } from 'react-router-dom'

class LoginForm extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      email: "",
      password: "",
      loginErrors: ""
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(event){
    event.preventDefault();
  }

  handleChange(event){
    event.preventDefault();
  }

  render() {
    return (
      <div className="vh-100 d-flex flex-column align-items-center justify-content-center">
        <div className="d-flex justify-content-center">
          <h1 className="h3">Login to readouts</h1>
        </div>
        <form 
          className="d-flex flex-column justify-content-center align-items-center" 
          onSubmit={this.handleSubmit}
        >
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

          <div className="form-group row d-flex justify-content-center">
            <div className="mx-auto">
              <button type="submit" className="btn btn-primary">Sign In</button>
            </div>
            <div className="text-muted">
              <span className="small">Don't have an account?</span> <Link to='/signup' className="small">Register here.</Link>
          </div>
          </div>
          
        </form>
      </div>
    )
  }
}

export default LoginForm