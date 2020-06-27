// Generic input field component
// used for making forms needing multiple text inputs
import React from 'react';

// props is coming from reduxForm's {Field}
// props.input contains event handlers for inputs
export default ({ input, label, meta: { touched, error } }) => {
  return (
    <div>
      <label>{label}</label>
      <input {...input} />
      <div className="red-text">
        {touched && error}
      </div>
    </div>
  )
}