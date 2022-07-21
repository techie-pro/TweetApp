import moment from 'moment';
import React from 'react';

const Reply = ({ reply }) => {
  return (
    <div>
      <hr />
      <div className='card fs-6'>
        <div className='card-body'>
          <p className='card-title'>
            <span className='badge rounded-pill bg-info fs-6'>
              {reply.username.charAt(0).toUpperCase()}
            </span>
            <span className='m-2'>{reply.username}</span>
            <span> {moment(reply.timestamp).fromNow()}</span>
          </p>
          <p className='card-text'>{reply.text}</p>
        </div>
      </div>
    </div>
  );
};

export default Reply;
