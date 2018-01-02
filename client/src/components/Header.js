import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import { withRouter } from 'react-router';

import * as actions from '../actions';
import Payments from './Payments';


class Header extends Component {
  constructor(props){
    super(props);
    this.logout = this.logout.bind(this);

  };
  renderContent(){
    switch (this.props.auth) {
      case null:
        return "";
      case false:
        return <li><a href="/auth/google">Login With Google</a></li>
      default:
        return [
          <li key="1"><Payments/></li>,
          <li key="2">Credits: {this.props.auth.credits}</li>,
          <li key="3"><a href="/api/logout" onClick={this.logout}>Logout</a></li>
        ];
    }
  }
  logout(e){
    e.preventDefault();
    this.props.logout();
    this.props.history.push('/');
  }
  render(){
    return (
        <nav>
          <div className="nav-wrapper">
            <Link to={this.props.auth ? '/surveys' : '/'} className="brand-logo">Emaily</Link>
            <ul id="nav-mobile" className="right">
                { this.renderContent() }
            </ul>
          </div>
        </nav>
    );
  };
}

const mapStateToProps = ({auth}) => ({ auth });
export default connect(mapStateToProps,actions)(withRouter(Header));
