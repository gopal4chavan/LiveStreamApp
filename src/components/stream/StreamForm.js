import React from 'react';
import { Field, reduxForm } from 'redux-form';


class StreamForm extends React.Component {
  renderErrorMessage({error, touched}){
    if(touched && error){
      return(
        <div className='ui error message'>
          <div className='header'>{error}</div>
        </div>
      )
    }
  }

  renderInput = ({ input, label, meta }) => {
    console.log(meta);
    const className = `field ${meta.touched && meta.error ? 'error' : ''}`
    return (
      <div className={className}>
        <label>{label}</label>
        <input {...input} />
        {this.renderErrorMessage(meta)}
      </div>
    )
  }

  onSubmit = (formValues) => {
    this.props.onSubmit(formValues);
  }

  render(){
    console.log(this.props);
    return (
      <form onSubmit={this.props.handleSubmit(this.onSubmit)} className='ui form error'>
        <Field 
          name="title" 
          component={this.renderInput} 
          label='Enter Title'
        />
        <Field 
          name="description" 
          component={this.renderInput} 
          label='Enter Description'
        />
        <button className="ui button primary">Submit Form</button>
      </form>
    )
  }
}

const validate = (formValues) => {
  const errors = {};
  
  if(!formValues.title){
    errors.title = "Please enter title"
  }

  if(!formValues.description){
    errors.description = "Please enter description"
  }

  return errors;
}

export default reduxForm({
  form: 'StreamForm',
  validate
})(StreamForm);
