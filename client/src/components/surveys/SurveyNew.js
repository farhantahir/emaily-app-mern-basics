import React,{Component} from 'react';
import SurveyForm from './SurveyForm';
import {reduxForm} from 'redux-form';
import SurveyFormReview from './SurveyFormReview';

class SurveyNew extends Component{
  state = {showReview: false};
  toggleShowReview(){
    this.setState({showReview: !this.state.showReview});
  }
  render(){  
    if(this.state.showReview) {
      return <SurveyFormReview toggleShowReview={() => this.toggleShowReview()}/>;
    }else{
      return <SurveyForm toggleShowReview={() => this.toggleShowReview()}/>
    }
  }
}

export default reduxForm({
  form:'SurveyForm'
})(SurveyNew);
