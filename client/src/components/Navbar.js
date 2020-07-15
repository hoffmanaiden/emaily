import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Navbar extends Component {
  renderContent() {
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return (
          <span>
            <li><a href='/auth/google'>Login</a></li>
          </span>
        );
      default:
        return(<a href='/api/logout'>Logout</a>)
    }
  }
  render() {
    console.log(this.props);
    return (
      <div className='nav-wrapper #bbdefb blue lighten-4'>
        <Link to={this.props.auth ? `/${this.props.auth.googleId}/home` : '/home'} className='brand-logo'>Read Things</Link>
        <ul className='right'>
          {this.renderContent()}
        </ul>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { auth: state.auth }
}

export default connect(mapStateToProps)(Navbar);