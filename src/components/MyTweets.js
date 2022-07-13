import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Tweets from './Tweets';
import { useNavigate } from 'react-router-dom';

const MyTweets = () => {
  const [tweets, setTweets] = useState([]);
  const nav = useNavigate();
  console.log('My Tweets');

  useEffect(() => {
    console.log('My Tweets inside useEffect');
    const token = sessionStorage.getItem('$myToken$');
    const username = sessionStorage.getItem('username');
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    if (token) {
      axios
        .get(`http://localhost:9731/api/v1.0/tweets/${username}`, { headers })
        .then((response) => {
          setTweets(response.data.data);
        })
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
    } else {
      alert('Login required to view MyTweets, Please Login');
      nav('/');
    }
  }, [nav]);
  return (
    <div>
      <Tweets tweets={tweets} />
    </div>
  );
};

export default MyTweets;
