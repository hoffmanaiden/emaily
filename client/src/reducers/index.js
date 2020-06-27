import {combineReducers} from 'redux';
import { reducer as reduxForm } from 'redux-form'; // reducer is a special key
import authReducer from './authReducer';
import surveysReducer from './surveysReducer';

export default combineReducers({
  auth: authReducer,
  form: reduxForm, // form is a special key
  surveys: surveysReducer
})