import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import Auth from '../api/loginUser';
import SignInLinks from '../components/signinLinks';
import SignOutLinks from '../components/signoutLinks';
import { getUser, getUserPending, getUserError } from '../reducers/userReducer';

export class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout() {
    const { signoutUser } = this.props;
    signoutUser();
  }

  render() {
    const { user } = this.props;
    const { data } = user;
    const authToken = localStorage.getItem('__token__');
    return (
      <nav className="navbar p-0">
        { data.auth_token || authToken ? (
          <SignOutLinks
            handleLogout={this.handleLogout}
          />
        ) : <SignInLinks /> }
      </nav>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
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

Navbar.defaultProps = {
  user: {},
};

Navbar.propTypes = {
  signoutUser: PropTypes.func.isRequired,
  user: PropTypes.shape({
    data: PropTypes.objectOf(PropTypes.any),
    pending: PropTypes.bool,
    error: PropTypes.string,
  }),
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
