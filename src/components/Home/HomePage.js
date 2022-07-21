import React, { useEffect, useState } from 'react';
import Form from '../Tweet/Form';
import useAxiosPrivate from '../../Hooks/useAxiosPrivate';
import useAuth from '../../Hooks/useAuth';

const HomePage = () => {
  const [tweets, setTweets] = useState([]);
  const axiosPrivate = useAxiosPrivate();
  const { auth } = useAuth;

  useEffect(() => {
    axiosPrivate
      .get(`/api/v1.0/tweets/all`)
      .then((response) => {
        response.data.data && setTweets(response.data.data);
      })
      .catch((err) => {
        if (err.response.data) {
          let message = err.response.data.message;
          let errors = err.response.data.errors;
          let pretty = `${message}\n`;
          for (const property in errors) {
            pretty = pretty.concat(`\t${errors[property]}\n`);
          }
          alert(pretty);
        } else {
          alert(err.message + ' Try again after some time');
        }
      });
  }, [axiosPrivate]);

  return (
    <>
      <h1 className='h1'>
        Welcome {auth?.username && auth?.username?.split('@')[0].toUpperCase()}
      </h1>
      <Form initial={tweets} />
    </>
  );
};

export default HomePage;
