import React, { useEffect, useState } from 'react';
import Form from './Form';
import Tweets from './Tweets';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const HomePage = () => {
  const [tweets, setTweets] = useState([]);
  const [tweetList, setTweetList] = useState([]);
  const nav = useNavigate();

  const username = sessionStorage.getItem('username');
  console.log('My Homepage');

  useEffect(() => {
    console.log('My Homepage inside useEffect');
    const token = sessionStorage.getItem('$myToken$');
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    if (token) {
      axios
        .get(`http://localhost:9731/api/v1.0/tweets/all`, { headers })
        .then((response) => {
          setTweets(response.data.data);
          setTweetList(response.data.data);
        })

        .catch((err) => {
          console.log(err);
          let message = err.response.data.message;
          let errors = err.response.data.errors;
          let pretty = `${message}\n`;
          for (const property in errors) {
            pretty = pretty.concat(`\t${errors[property]}\n`);
          }
          alert(pretty);
        });
    } else {
      alert('Login required to view Home, Please Login');
      nav('/');
    }
  }, [nav]);

  useEffect(() => {
    setTweets(tweetList);
  }, [tweetList]);

  const addTweetToState = (tweet) => {
    setTweetList([...tweetList, tweet]);
  };

  return (
    <>
      <h1 className='h1'>
        Welcome {username && username.split('@')[0].toUpperCase()}
      </h1>
      <Form addTweet={addTweetToState} />
      <Tweets tweets={tweets} />
    </>
  );
};

export default HomePage;
