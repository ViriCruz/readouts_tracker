// users
const FETCH_USER_PENDING = 'FETCH_USER_PENDING';
const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS';
const FETCH_USER_ERROR = 'FETCH_USER_ERROR';
const NOT_LOGGED_IN = 'NOT_LOGGED_IN'
// categories
const FETCH_CATEGORIES_PENDING = 'FETCH_CATEGORIES_PENDING';
const FETCH_CATEGORIES_SUCCESS = 'FETCH_CATEGORIES_SUCCESS';
const FETCH_CATEGORIES_ERROR = 'FETCH_CATEGORIES_ERROR';
// readings
const FETCH_READINGS_PENDING = 'FETCH_READINGS_PENDING';
const FETCH_READINGS_SUCCESS = 'FETCH_READINGS_SUCCESS';
const FETCH_READINGS_ERROR = 'FETCH_READINGS_ERROR';

const FETCH_TOTAL_TIME_PENDING = 'FETCH_TOTAL_TIME_PENDING';
const FETCH_TOTAL_TIME_SUCCESS = 'FETCH_TOTAL_TIME_SUCCESS';
const FETCH_TOTAL_TIME_ERROR = 'FETCH_TOTAL_TIME_ERROR';
// measurements
const FETCH_MEASUREMENTS_PENDING = 'FETCH_MEASUREMENTS_PENDING';
const FETCH_MEASUREMENTS_SUCCESS = 'FETCH_MEASUREMENTS_SUCCESS';
const FETCH_MEASUREMENTS_ERROR = 'FETCH_MEASUREMENTS_ERROR';

// single category
const SET_CATEGORY = 'SET_CATEGORY'


const fetchUserPending = () => ({
  type: FETCH_USER_PENDING,
});

const fetchUserSuccess = data => ({
  type: FETCH_USER_SUCCESS,
  data,
});

const fetchUserError = error => ({
  type: FETCH_USER_ERROR,
  error,
});

const userSignOut = data => ({
  type: NOT_LOGGED_IN,
  data
})

const fetchCategoriesPending = () => ({
  type: FETCH_CATEGORIES_PENDING,
});

const fetchCategoriesSuccess = data => ({
  type: FETCH_CATEGORIES_SUCCESS,
  data,
});

const fetchCategoriesError = error => ({
  type: FETCH_CATEGORIES_ERROR,
  error,
});

const fetchReadingsPending = () => ({
  type: FETCH_READINGS_PENDING,
});

const fetchReadingsSuccess = data => ({
  type: FETCH_READINGS_SUCCESS,
  data,
});

const fetchReadingsError = error => ({
  type: FETCH_READINGS_ERROR,
  error,
});

const fetchMeasurementsPending = () => ({
  type: FETCH_MEASUREMENTS_PENDING,
});

const fetchMeasurementsSuccess = data => ({
  type: FETCH_MEASUREMENTS_SUCCESS,
  data,
});

const fetchMeasurementsError = error => ({
  type: FETCH_MEASUREMENTS_ERROR,
  error,
});

const setCategory = category => ({
  type: SET_CATEGORY,
  category
})

const fetchTotalTimePending = () => ({
  type: FETCH_TOTAL_TIME_PENDING
})

const fetchTotalTimeSuccess = data => ({
  type: FETCH_TOTAL_TIME_SUCCESS,
  data
})

const fetchTotalTimeError = error => ({
  type: FETCH_TOTAL_TIME_ERROR,
  error
})

export {
  FETCH_USER_PENDING,
  FETCH_USER_SUCCESS,
  FETCH_USER_ERROR,
  FETCH_CATEGORIES_PENDING,
  FETCH_CATEGORIES_SUCCESS,
  FETCH_CATEGORIES_ERROR,
  FETCH_READINGS_PENDING,
  FETCH_READINGS_SUCCESS,
  FETCH_READINGS_ERROR,
  FETCH_MEASUREMENTS_PENDING,
  FETCH_MEASUREMENTS_SUCCESS,
  FETCH_MEASUREMENTS_ERROR,
  FETCH_TOTAL_TIME_PENDING,
  FETCH_TOTAL_TIME_ERROR,
  FETCH_TOTAL_TIME_SUCCESS,
  SET_CATEGORY,
  NOT_LOGGED_IN,
  fetchUserPending,
  fetchUserSuccess,
  fetchUserError,
  fetchCategoriesPending,
  fetchCategoriesSuccess,
  fetchCategoriesError,
  fetchReadingsPending,
  fetchReadingsSuccess,
  fetchReadingsError,
  fetchMeasurementsPending,
  fetchMeasurementsSuccess,
  fetchMeasurementsError,
  fetchTotalTimeError,
  fetchTotalTimePending,
  fetchTotalTimeSuccess,
  setCategory,
  userSignOut
};
