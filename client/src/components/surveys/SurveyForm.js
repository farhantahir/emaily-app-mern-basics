import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import {reduxForm, Field} from 'redux-form';
import _ from 'lodash';
import SurveyField from './SurveyField';
import * as validations from '../../utils/validations';
import Fields from './SurveyFormFields';


const validate = values => {
  const errors = {}
  _.each(Fields,({name,label}) => {
    if(!values[name]){
      errors[name] = `${label} is required.`;
    }
  });
  if(values.recipients && values.recipients.trim().endsWith(",")){
    errors.recipients = 'No trailing commas allowed';
  }else if(values.recipients){
    const inValidEmails = [];
    _.each(values.recipients.split(','), email => {
        if (!validations.isValidEmail(email)) {
          inValidEmails.push(email);
        }
    });

    if(inValidEmails.length){
      errors.recipients = `Invalid email address: ${inValidEmails.join(',')}`;
    }

  }
  return errors
}

class SurveyForm extends Component{
  renderFields(){
      return _.map(Fields, field => {
        return <Field key={field.id} type='input' component={SurveyField} {...field} />;
      })
  }
  render(){
    return (
      <div>
        <form onSubmit={this.props.handleSubmit(() => this.props.toggleShowReview())}>
          {this.renderFields()}
          <Link to="/surveys" className="red btn-flat white-text">Cancel</Link>
          <button className="btn waves-effect waves-light white-text right" type="submit" name="action">Next
            <i className="material-icons right">done</i>
          </button>
        </form>
      </div>
    );
  };
}
export default reduxForm({
  form:'SurveyForm',
  validate,
  destroyOnUnmount:false
})(SurveyForm);
