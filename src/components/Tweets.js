import React from 'react';
import Tweet from './Tweet';
const Tweets = ({ tweets }) => {
  return (
    <div className='container my-5'>
      <div className='row justify-content-center'>
        <div className='col-6'>
          {tweets
            .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
            .map((tweet) => {
              return (
                <Tweet tweet={tweet}/>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Tweets;
