import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';
import _ from 'lodash';

import './surveyStyle.css';
import SurveyField from './SurveyField';
import validateEmails from '../../utils/validateEmails';
import formFields from './fields';

class SurveyForm extends Component {
  renderFields() {
    return _.map(formFields, field => {
      return <Field
        key={field.name}
        component={SurveyField}
        type="text"
        name={field.name}
        label={field.label}
      />
    })
  }

  render() {
    return (
      <div>
        {/* handleSubmit() is provided by reduxForm */}
        {/* onSurveySubmit() is provided by us in SurveyNew.js */}
        <form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}>
          {this.renderFields()}
          <button className="green btn-flat right white-text" type="submit" name="action">
            Next
           <i className="material-icons right">done</i>
          </button>
          <Link to="/surveys" className="black btn-flat white-text">
            Cancel
            <i className="material-icons right">cancel</i>
          </Link>
        </form>
      </div>
    );
  }
}

function validate(values) {
  const errors = {};

  // validateEmails() comes from /src/utils/
  errors.recipients = validateEmails(values.recipients || '');
  // or string, because values.email will be NULL at start

  _.each(formFields, ({ name }) => {
    if (!values[name]) {
      errors[name] = `You must provide a ${name}`
      if(name === 'recipients'){
        errors[name] = 'You must provide at least one valid email'
      }
    }
  });

  return errors;
}


// see surveyNew for form values dump explanation
export default reduxForm({
  validate,
  form: 'surveyForm', // 'form' key required!
  destroyOnUnmount: false // allows toggling between form and review
})(SurveyForm);