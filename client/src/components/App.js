import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';
// root of react

import './generalStyle.css';
import Header from './Header';
import Landing from './Landing';
import Dashboard from './Dashboard';
import SurveyNew from './surveys/SurveyNew';


class App extends Component{

  componentDidMount(){
    this.props.fetchUser();
    if(this.props.auth){
      this.props.history.pushState(this.state, '/surveys')
    }
  }

  render(){
    console.log(this.props);
    return(
      <div className="container">
        <Router>
          <div>
            <Header />
            <Route exact path="/">
              {this.props.auth ? <Redirect to="/surveys"/> : <Landing />}
            </Route>
            <Route exact path="/surveys" component={Dashboard} />
            <Route path="/surveys/new" component={SurveyNew} />
          </div>
        </Router>
      </div>
    );
  }
}

function mapStateToProps(state){
  return { auth: state.auth }
}

export default connect(mapStateToProps, actions)(App);