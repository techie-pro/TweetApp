import React, { useEffect, useState } from "react";
import Tweet from "./Tweet";

const Tweets = ({ tweets }) => {
  const [tweetList, setTweetList] = useState([]);

  useEffect(() => {
    setTweetList(tweets);
  }, [tweets]);

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-6">
          {tweetList
            .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
            .map((tweet) => {
              return <Tweet tweet={tweet} key={tweet.id} />;
            })}
        </div>
      </div>
    </div>
  );
};

export default Tweets;
