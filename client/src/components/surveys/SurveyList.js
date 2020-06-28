import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchSurveys } from '../../actions';

class SurveyList extends Component {

  componentDidMount() {
    this.props.fetchSurveys();
  }

  renderSurveys() {
    return this.props.surveys
      .reverse()
      .map(survey => {
        console.log(survey);
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
              <p>
                Yes votes: {survey.yes}
              </p>
              <p>
                No votes {survey.no}
              </p>
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

function mapStateToProps({ surveys }) {
  return { surveys };
}
// this is REDUX state!
// function mapStateToProps(state){
//   return { surveys: state.surveys };
// }


export default connect(mapStateToProps, { fetchSurveys })(SurveyList);