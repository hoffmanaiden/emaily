import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';
// root of react

import Navbar from './Navbar';

const Landing = () => <h2>Landing</h2>;
const Signup = () => <h2>Signup</h2>;
const Login = () => <h2>Login</h2>;
const Home = () => <h2>Home</h2>;
const UsersHome = () => <h2>User's Home</h2>;
const UsersPage = () => <h2>User's Profile Page</h2>;
const SinglePost = () => <h2>Single Post</h2>;
const UsersUpvotes = () => <h2>User's Upvotes</h2>;
const UsersDownvotes = () => <h2>User's Downvotes</h2>;
const UsersSaves = () => <h2>User's Saves</h2>;
const UsersComments = () => <h2>User's Comments</h2>;
const UsersFollowers = () => <h2>User's Followers</h2>;
const UsersFollows = () => <h2>User's Follows</h2>;

class App extends Component{

  componentDidMount(){
    this.props.fetchUser();
    // if(this.props.auth){
    //   this.props.history.pushState(this.state, '/surveys')
    // }
  }

  render() {
    console.log(this.props);
    return (
      <div className="container">
        <Router>
          <div>
            <Navbar />
            <Route exact path='/' component={Landing} />
            <Route exact path='/signup' component={Signup} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/home' component={Home} />
            <Route path='/:userId/home' component={UsersHome} />
            <Route path='/:usersId' component={UsersPage} />
            <Route path='/posts/:postId' component={SinglePost} />
            <Route path='/:userId/upvotes' component={UsersUpvotes} />
            <Route path='/:userId/downvotes' component={UsersDownvotes} />
            <Route path='/:userId/saves' component={UsersSaves} />
            <Route path='/:userId/comments' component={UsersComments} />
            <Route path='/:userId/followers' component={UsersFollowers} />
            <Route path='/:userId/follows' component={UsersFollows} />
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