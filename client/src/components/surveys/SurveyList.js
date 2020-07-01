import React, { Component } from 'react';
import { connect } from 'react-redux';

import './surveyStyle.css';
import { fetchSurveys } from '../../actions';

class SurveyList extends Component {

  componentDidMount() {
    this.props.fetchSurveys();
  }

  renderSurveys() {
    return this.props.surveys
      .reverse()
      .map(survey => {
        return (
          <div className="card" key={survey._id}>
            <div className="card-content">
              <span className="card-title">{survey.title}</span>
              <p>
                {survey.body}
              </p>
              <p className="right">
                {new Date(survey.dateSent).toLocaleDateString()}
              </p>
              <div>
                <span>Yes votes: {survey.yes} </span>
                <svg width="300" height="12">
                  <rect
                    x="0"
                    y="0"
                    fill="#2196f3"
                    width={(survey.yes / survey.recipientListCount) * 300}
                    height="12"
                  />
                </svg>
              </div>
              <div>
                <span>No votes: {survey.no} </span>
                <svg width="300" height="12">
                  <rect
                    x="0"
                    y="0"
                    fill="#f44336"
                    width={(survey.no / survey.recipientListCount) * 300}
                    height="12"
                  />
                </svg>
              </div>
            </div>
          </div>
        )
      })
  }

  render() {
    return (
      <div>
        {this.renderSurveys()}
      </div>
    );
  }
}

// this is REDUX state!
function mapStateToProps({ surveys }) {
  return { surveys };
}
// function mapStateToProps(state){
//   return { surveys: state.surveys };
// }


export default connect(mapStateToProps, { fetchSurveys })(SurveyList);