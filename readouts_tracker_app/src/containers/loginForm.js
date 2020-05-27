import React from 'react';
import { Link, Redirect } from 'react-router-dom'
import Auth from '../api/loginUser'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { getUser, getUserPending, getUserError } from '../reducers/userReducer';
import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button'

const mapDispatchToProps = dispatch => bindActionCreators({
  signin_user: Auth.signin,
  signout_user: Auth.signout
}, dispatch);

const mapStateToProps = state => ({
    user: {
      error: getUserError(state.user),
      data: getUser(state.user),
      pending: getUserPending(state.user)
    }
  }
)

class LoginForm extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      email: "",
      password: ""
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount(){
    const { signout_user } = this.props
    signout_user()
  }

  handleSubmit(event){
    event.preventDefault();
    const { email, password } = this.state
    const { signin_user } = this.props
    const data = {
      email: email,
      password: password
    }
    signin_user(data)
    // send to api login

  }

  handleChange(event){
    event.preventDefault();
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  render() {
    const { user } = this.props
    const { pending, error, data } = user
    if(data.auth_token || localStorage.getItem('__token__')) return <Redirect to='/categories' />
    
    if(!pending){
      return (
        <div className="vh-100 d-flex flex-column align-items-center justify-content-center">
          <div 
            className={`alert alert-danger ${error ? "d-block":"d-none"}`}
            role="alert"
          >
            {error ? error : ''}
          </div>
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
  
            <div className="form-group d-flex flex-column justify-content-center">
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
    
    return (
      <div className="vh-100 d-flex align-items-center justify-content-center">
        <Button variant="primary" disabled>
          <Spinner
            as="span"
            animation="border"
            size="sm"
            role="status"
            aria-hidden="true"
          />
          Loading...
        </Button>
      </div>
    )
    
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm)