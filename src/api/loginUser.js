import {
  fetchUserPending,
  fetchUserSuccess,
  fetchUserError,
  userSignOut,
} from '../actions/index';

import DOMAIN from './domain';


const signin = data => async dispatch => {
  dispatch(fetchUserPending);
  try {
    const response = await fetch(`${DOMAIN}/auth/login`,
      {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(data),
      });
    const json = await response.json();
    if (response.ok) {
      dispatch(fetchUserSuccess(json));
      localStorage.setItem('__token__', json.auth_token);
    }
    throw new Error(json.message);
  } catch (err) {
    dispatch(fetchUserError(err));
    return err;
  }
};

const signout = () => dispatch => {
  localStorage.removeItem('__token__');
  const data = {
    auth_token: null,
  };
  dispatch(userSignOut(data));
};

export default { signin, signout };
