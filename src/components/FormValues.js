import React from 'react';
import Register from './Register';

const FormValues = () => {
  const onSubmitHandler = (registeredValues) => {
    console.log(registeredValues);
  };
  return <Register submit={onSubmitHandler} />;
};

export default FormValues;
