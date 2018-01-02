import React from 'react';
import {connect} from 'react-redux';
import Fields from './SurveyFormFields';
import {withRouter} from 'react-router-dom';
import * as actions from '../../actions';
import _ from 'lodash';
function renderReviewValues(formValues){
  return _.map(Fields, ({id,name,label}) => {
    return (
      <div key={id}>
        <label>{label}:</label>
        <div>{formValues[name]}</div>
      </div>
    );
  });
}
const SurveyFormReview = ({toggleShowReview, formValues, submitSurvey, history}) => {
  return (
    <div>
      Please confirm your entries.
      {renderReviewValues(formValues)}
      <button className="btn yellow darken-3 left" onClick={() => toggleShowReview()}>Back
        <i className="material-icons left">arrow_back</i>
      </button>
      <button className="btn green white-text right" name="action" onClick={() => submitSurvey(formValues,history)}>Send Survey
        <i className="material-icons right">email</i>
      </button>
    </div>
  );
};

function mapStateToProps(state){
  return {formValues: state.form.SurveyForm.values};
}

export default connect(mapStateToProps,actions)(withRouter(SurveyFormReview));
