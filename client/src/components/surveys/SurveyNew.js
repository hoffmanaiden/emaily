// This is the Survey container for
// SurveyForm and SurveyFormReview
//
// SurveyNew's purpose:
// route between form & review
// clear form values when canceled

import React, {Component} from 'react';
import {reduxForm} from 'redux-form';

import SurveyForm from './SurveyForm';
import ReviewForm from './SurveyFormReview';
import './surveyStyle.css';

class SurveyNew extends Component {
  state = {showReview: false};

  renderContent() {
    if(this.state.showReview){
      return <ReviewForm onCancel={() => this.setState({showReview: false})} />
    }
    return <SurveyForm onSurveySubmit={() => this.setState({showReview: true})} />
  }

  render(){
    return(
      <div>
        {this.renderContent()}
      </div>
    );
  }
}

// because redux-form's default behavior
// is to dump form values when un-mounted,
// and because destroyOnUnmount is not specified
// when we cancel the survey form we are
// un-mounting surveyNew as well.
// Therefore, form values are dumped
export default reduxForm({
  form: 'surveyForm'
})(SurveyNew);