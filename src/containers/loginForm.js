import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';
import { getUser, getUserPending, getUserError } from '../reducers/userReducer';
import Auth from '../api/loginUser';

const mapDispatchToProps = dispatch => bindActionCreators({
  signinUser: Auth.signin,
  signoutUser: Auth.signout,
}, dispatch);

const mapStateToProps = state => ({
  user: {
    error: getUserError(state.user),
    data: getUser(state.user),
    pending: getUserPending(state.user),
  },
}
);

export class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    const { signoutUser } = this.props;
    signoutUser();
  }

  handleSubmit(event) {
    event.preventDefault();
    const { email, password } = this.state;
    const { signinUser } = this.props;
    const data = {
      email,
      password,
    };
    signinUser(data);
    // send to api login
  }

  handleChange(event) {
    event.preventDefault();
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  render() {
    const { user } = this.props;
    const { pending, error, data } = user;
    const { email, password } = this.state;
    if (data.auth_token || localStorage.getItem('__token__')) {
      return <Redirect to="/categories" />;
    }

    if (!(data.auth_token || localStorage.getItem('__token__'))) {
      return (
        <div className="vh-100 d-flex flex-column align-items-center justify-content-center">
          <div
            className={`alert alert-danger ${error ? 'd-block' : 'd-none'}`}
            role="alert"
          >
            {error || ''}
          </div>
          <div className="d-flex justify-content-center">
            <h1 className="h3 py-3">Login to readouts</h1>
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
                value={email}
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
                value={password}
                onChange={this.handleChange}
                required
              />
            </div>

            <div className="form-group d-flex flex-column justify-content-center">
              <div className="mx-auto">
                <button type="submit" className="btn btn-primary">Sign In</button>
              </div>
              <div className="text-muted">
                <span className="small">Don&#39;t have an account?</span>
                {' '}
                <Link to="/signup" className="small">Register here.</Link>
              </div>
            </div>

          </form>
        </div>
      );
    }
    if (pending) {
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
      );
    }

    return <div />;
  }
}

LoginForm.defaultProps = {
  user: {},
};

LoginForm.propTypes = {
  user: PropTypes.shape({
    data: PropTypes.objectOf(PropTypes.object),
    pending: PropTypes.bool,
    error: PropTypes.string,
  }),
  signoutUser: PropTypes.func.isRequired,
  signinUser: PropTypes.func.isRequired,
};
export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
