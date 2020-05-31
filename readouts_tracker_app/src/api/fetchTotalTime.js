import {
  fetchTotalTimePending,
  fetchTotalTimeSuccess,
  fetchTotalTimeError
} from '../actions/index'

import { DOMAIN } from './domain'

const totalTime = async(token, cat, date) => {
  const requestOptions = {
    headers: {
      'Content-type':'application/json',
      'Authorization': token
    }
  }
  const response = await fetch(`${DOMAIN}/api/v1/categories/${cat}/readings/total_time/${date}`, requestOptions)
  return response
}

const fetchTotalTime = (token, cat, date) => async dispatch => {
  // pending
  dispatch(fetchTotalTimePending)
  try {
    // success
    const response = totalTime(token, cat, date)
    const json = await response.json()
    if (response.ok){
      console.log(json);
      dispatch(fetchTotalTimeSuccess(json))
      return json
    }
    
    throw new Error(response.status)
  } catch (error) {
    // error
    dispatch(fetchTotalTimeError(error))
    return error
  }
}

export default {
  fetchTotalTime
}