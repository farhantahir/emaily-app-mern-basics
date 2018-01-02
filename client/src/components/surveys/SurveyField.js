import React from 'react';

export default (props) => {
  const {input, label, meta:{error, touched} }= props;
  return (
    <div>
      <label  htmlFor={input.id}>{label}</label>
      <input {...input} style={{marginBottom: '5px'}}/>
      <div className="red-text" style={{marginBottom: '20px'}}>
        {touched && error}
      </div>
    </div>
  );
};
