import React from 'react';
import { Field, reduxForm } from 'redux-form';


const SimpleForm = props => {
  const { handleSubmit, pristine, reset, submitting } = props;
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Full Name</label>
        <div>
          <Field
            name="full_name"
            component="input"
            type="text"
            placeholder="Full Name"
          />
        </div>
      </div>
      <div>
        <label>appointment_time</label>
        <div>
          <Field
            name="appointment_time"
            component="input"
            type="text"
            placeholder="Appointment Time"
          />
        </div>
      </div>
      <div>
        <label>Appointment Reason</label>
        <div>
          <Field
            name="appointment_reason"
            component="textarea"
            type="email"
            placeholder="Appointment Reason"
          />
        </div>
      </div>
      	  
      
      <div>
        <button type="submit" disabled={pristine || submitting}>Submit</button>
        <button type="button" disabled={pristine || submitting} onClick={reset}>
          Clear Values
        </button>
      </div>
    </form>
  );
};

export default reduxForm({
  form: 'simple', // a unique identifier for this form
})(SimpleForm);
