import axios from 'axios';

import {FETCH_USER,LOGOUT_USER,FETCH_SURVEYS} from './types';

export const fetchUser = () => async dispatch => {
      const res = await axios.get('/api/current_user');
      dispatch({type: FETCH_USER, payload: res.data});
};

export const logout = () => async dispatch => {
  await axios.get('/api/logout');
  dispatch({type: LOGOUT_USER, payload: {}});
};

export const handleStripeToken = token => async dispatch => {
  const res = await axios.post('/api/stripe', token);
  dispatch({type: FETCH_USER, payload: res.data });
};

export const submitSurvey = (values,history) => async dispatch => {
  const res = await axios.post('/api/surveys', values);
  history.push('/surveys');
  // reuse action
  dispatch({type: FETCH_USER, payload: res.data });
};

export const fetchSurveys = () => async dispatch => {
  const res = await axios.get('/api/surveys');
  dispatch({type: FETCH_SURVEYS, payload: res.data});
};
