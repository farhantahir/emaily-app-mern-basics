import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchSurveys} from '../../actions/index';

class SurveyList extends Component {
  componentDidMount(){
    this.props.fetchSurveys();
  }
  renderSurveys(){
    return this.props.surveys.reverse().map(survey => {
      return (
        <div key={survey._id} className="card blue-grey darken-1">
          <div className="card-content white-text">
              <span className="card-title">{survey.title}</span>
              <p>{survey.body}</p>
              <p className="right">Sent On: {new Date(survey.dateSent).toLocaleDateString()}</p>
          </div>
          <div className="card-action">
              <a href="#">Yes :{survey.yes} </a>
              <a href="#">No: {survey.no}</a>
          </div>
        </div>
      );
    });
  }
  render(){
    return (
      <div>
        {this.renderSurveys()}
      </div>
    );
  }
}
function mapStateToProps({surveys}){
  return {surveys};
};
export default connect(mapStateToProps, {fetchSurveys})(SurveyList);
