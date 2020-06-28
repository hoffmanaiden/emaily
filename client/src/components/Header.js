import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Payments from './Payments';

class Header extends Component {

  renderContent() {
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return (
          <li><a href="/auth/google">Login</a></li>
        );
      default:
        return [
          <li key='3' style={{marginRight: '20px'}}>Credits: {this.props.auth.credits}</li>,
          <li key='1'><Payments /></li>,
          <li key='2'><a href='/api/logout'>Logout</a></li>
        ];
    }
  }

  render() {
    return (
      <nav>
        <div className='nav-wrapper blue'>
          <Link to={this.props.auth ? '/surveys' : '/'}
            className='left brand-logo'>
              <i className="large material-icons">email</i>
              Emaily
          </Link>
          <ul className='right'>
            {this.renderContent()}
          </ul>
        </div>
      </nav>
    )
  }
}

function mapStateToProps(state) {
  return { auth: state.auth };
}

export default connect(mapStateToProps)(Header);