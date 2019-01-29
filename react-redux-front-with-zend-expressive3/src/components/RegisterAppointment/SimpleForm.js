import React from 'react';
import { Field, reduxForm } from 'redux-form';


const SimpleForm = props => {
  const { handleSubmit, pristine, reset, submitting } = props;
  return (
    <form onSubmit={handleSubmit} method="post">
      <div>
         <label> </label>
        <div>
          <Field
            name="full_name"
            component="input"
            type="text"
			className="form-control"
            placeholder="Full Name"
          />
        </div>
      </div>
      <div>
         <label> </label>
        <div>
          <Field
            name="appointment_time"
            component="input"
            type="datetime-local"
			
            placeholder="Appointment Time"
          />
        </div>
      </div>
      <div>
        <label> </label>
        <div>
          <Field
            name="appointment_reason"
            component="textarea"
            type="email"
			className="form-control"
            placeholder="Appointment Reason"
          />
        </div>
      </div>
      	  
      
      <div>
	  <div className="clearboth"> 
        <button type="submit" className="btn btn-primary"  disabled={pristine || submitting}>Submit</button>
		</div>
		<div className="clearboth"> 
        <button type="button" className="btn btn-primary"  disabled={pristine || submitting} onClick={reset}>
          Clear Values
        </button>
      </div>
      </div>
    </form>
  );
};

export default reduxForm({
  form: 'simple', // a unique identifier for this form
})(SimpleForm);
