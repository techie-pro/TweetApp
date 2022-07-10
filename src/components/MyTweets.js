import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Tweets from './Tweets';
import { useNavigate } from 'react-router-dom';

const MyTweets = () => {
  const [tweets, setTweets] = useState([]);
  const nav = useNavigate();
  useEffect(() => {
    const headers = {
      Authorization: `Bearer ${sessionStorage.getItem('$myToken$')}`,
    };
    const username = sessionStorage.getItem('username');
    axios
      .get(`http://localhost:9731/api/v1.0/tweets/${username}`, { headers })
      .then((response) => setTweets(response.data.data))
      .catch((err) => {
        if (err.response.status === 403) {
          alert('Login required to view this page, Please Login');
          nav('/');
        } else {
          let message = err.response.data.message;
          let errors = err.response.data.errors;

          let pretty = `${message}\n`;
          for (const property in errors) {
            pretty = pretty.concat(`\t${errors[property]}\n`);
          }

          alert(pretty);
        }
      });
  }, [tweets, nav]);
  return (
    <div>
      <Tweets tweets={tweets} />
    </div>
  );
};

export default MyTweets;
