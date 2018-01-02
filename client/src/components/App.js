import React, {Component} from 'react';
import {connect} from 'react-redux';
import {BrowserRouter, Route} from 'react-router-dom';
import Header from './Header';
import Landing from './Landing';
import Dashboard from './Dashboard';
import SurveyNew from './surveys/SurveyNew';
import * as actions from '../actions';


class App extends Component{
  componentDidMount(){
    this.props.fetchUser();
  }
  routeContent(){
    if(this.props.auth){
      return (
        <div>
          <Header/>
          <Route exact path="/" component={Landing}/>
          <Route exact path="/surveys" component={Dashboard}/>
          <Route exact path="/surveys/new" component={SurveyNew}/>
        </div>
      );
    } else {
      return (
        <div>
          <Header/>
          <Route exact path="/" component={Landing}/>
        </div>
      );
    }
  }
  render(){
    return (
      <div  className="container">
        <BrowserRouter>
            {this.routeContent()}
        </BrowserRouter>
      </div>
    );
  };
};
const mapStateToProps = state => ({ ...state });
export default connect(mapStateToProps,actions)(App);
