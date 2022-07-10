import React from 'react';
import moment from 'moment';
const Tweets = ({ tweets }) => {
  return (
    <div className='container my-5'>
      <div className='row justify-content-center'>
        <div className='col-6'>
          {tweets
            .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
            .map((tweet) => {
              return (
                <div className='card' key={tweet.id}>
                  <div className='card-body'>
                    <p className='card-title'>
                      <span className='badge rounded-pill bg-success fs-6'>
                        {tweet.username.charAt(0)}
                      </span>
                      <span className='m-2'>{tweet.username}</span>
                      <span> {moment(tweet.timestamp).fromNow()}</span>
                    </p>
                    <h6 className='card-text'>{tweet.text}</h6>
                    <a href='/#' className='btn btn-outline-success btn-sm'>
                      Edit
                    </a>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Tweets;
