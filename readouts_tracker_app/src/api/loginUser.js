import {
  fetchUserPending,
  fetchUserSuccess,
  fetchUserError
} from '../actions/index'

import { DOMAIN } from './domain'


const signin = data => async dispatch => {
  dispatch(fetchUserPending)
  try {
    const response = await fetch(`${DOMAIN}/auth/login`,
      {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(data)
      }
    )
    const json = await response.json();
    if(response.ok){
      dispatch(fetchUserSuccess(json))
    }
    throw new Error(json.message)
  } catch (err) {
    dispatch(fetchUserError(err))
    return err
  }
}

export default signin