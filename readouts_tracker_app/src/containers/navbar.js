import React from 'react';
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import Auth from '../api/loginUser'
import { SignInLinks } from '../components/signinLinks'
import { SignOutLinks } from '../components/signoutLinks'
import { getUser, getUserPending, getUserError } from '../reducers/userReducer'

export class Navbar extends React.Component{
  constructor(props){
    super(props)
    this.handleLogout = this.handleLogout.bind(this)
  }

  handleLogout(){
    const { signout_user } = this.props
    signout_user()
  }

  render() {
    const { data } = this.props.user
    const auth_token = localStorage.getItem('__token__')
    return(
      <nav className="navbar p-0">
        { data.auth_token || auth_token ? <SignOutLinks handleLogout={this.handleLogout} /> : <SignInLinks /> }
      </nav>
    )
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  signout_user: Auth.signout,
}, dispatch);

const mapStateToProps = state => ({
    user: {
      error: getUserError(state.user),
      data: getUser(state.user),
      pending: getUserPending(state.user)
    }
  }
)

export default connect(mapStateToProps, mapDispatchToProps)(Navbar)