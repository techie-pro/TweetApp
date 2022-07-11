import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
const NotFound = () => {
  const nav = useNavigate();
  useEffect(() => {
    setTimeout(() => {
      nav('/');
    }, 2000);
  },[nav]);
  return (
    <>
      <h1>Page Not found</h1>
    </>
  );
};

export default NotFound;
