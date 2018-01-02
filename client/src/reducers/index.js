import {combineReducers} from 'redux';
import authReducer from './authReducer';
import surveysReducer from './surveysReducer';
import {reducer as reduxForm} from 'redux-form';

export default combineReducers({
  auth: authReducer,
  form: reduxForm,
  surveys:surveysReducer
});
