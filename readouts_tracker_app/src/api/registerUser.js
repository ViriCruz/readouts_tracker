import {
  fetchUserPending,
  fetchUserSuccess,
  fetchUserError,
} from '../actions/index';

import DOMAIN from './domain';

const createUser = async user => {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user),
  };
  const response = await fetch(`${DOMAIN}/signup`,
    requestOptions);

  if (response.ok) return response.json();
  throw new Error(response.status);
};

const registerUser = userParams => async dispatch => {
  // pending
  dispatch(fetchUserPending);
  try {
    // success
    const response = await createUser(userParams);
    const { user } = userParams;
    const data = {
      ...response,
      user: `${user.first_name} ${user.last_name}`,
      email: user.email,
    };
    localStorage.setItem('__token__', response.auth_token);
    dispatch(fetchUserSuccess(data));
    return response;
  } catch (error) {
    // failure
    dispatch(fetchUserError(error));
    return error;
  }
};

export default {
  registerUser,
};
