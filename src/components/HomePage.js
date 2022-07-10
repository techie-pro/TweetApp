import React, { useEffect, useState } from 'react';
import Form from './Form';
import Tweets from './Tweets';
import axios from 'axios';

const HomePage = () => {
  const [tweets, setTweets] = useState([]);

  useEffect(() => {
    const headers = {
      Authorization: `Bearer ${sessionStorage.getItem('$myToken$')}`,
    };
    axios
      .get(`http://localhost:9731/api/v1.0/tweets/all`, { headers })
      .then((response) => setTweets(response.data.data))
      .catch((err) => {
        console.log(err);
      });
  }, [tweets]);
  const addTweetToState = (tweet) => {
    setTweets([...tweets, tweet]);
  };
  return (
    <>
      <Form addTweet={addTweetToState} />
      <Tweets tweets={tweets} />
    </>
  );
};

export default HomePage;
