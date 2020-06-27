import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { withRouter } from 'react-router-dom'

import formFields from './fields';
import * as actions from '../../actions';

// props
// (surveyNew) (reduxForm) (withRouter)
// { onCancel, formValues, history (all action creators) }
const SurveyReview = (props) => {
  const reviewFields = _.map(formFields, field => {
    return (
      <div key={field.name}>
        <label>{field.label}</label>
        <div>
          {/* computed property - tricky & clever */}
          {/* prop.formValues (REDUX state) */}
          {/* field.name from formFields (static file) */}
          {props.formValues[field.name]}
        </div>
      </div>
    );
  });
  // render \/
  return (
    <div>
      <h5>Please confirm the information you have provided</h5>
      {reviewFields}
      <button
        className="yellow darken-3 btn-flat white-text"
        onClick={props.onCancel}
      >
        Back
      </button>
      <button 
        className="green btn-flat white-text right"
        // submitSurvey() is an action creator
        onClick={() => props.submitSurvey(props.formValues, props.history)}
      >
        Send Survey
        <i className="material-icons right">email</i>
      </button>
    </div>
  );
};

// I've said it once & I'll say it again
// we are mapping REDUX state to component props
function mapStateToProps(state) {
  // state.form.surveyForm.values
  // contains...
  // {title: "value", subject: "value", body: "value", email: "value"}
  return { formValues: state.form.surveyForm.values };
  // formValues can now be extracted as props from the component above
}

export default connect(mapStateToProps, actions)(withRouter(SurveyReview));