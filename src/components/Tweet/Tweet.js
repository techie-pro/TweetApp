import axios from 'axios';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { BsSuitHeart } from 'react-icons/bs';
import { useLocation, useNavigate } from 'react-router-dom';
import EditForm from './EditForm';
import Reply from './Reply';
import ReplyModal from './ReplyModal';
const Tweet = ({ tweet, deleteTweet }) => {
  const nav = useNavigate();
  const [isEdit, setIsEdit] = useState(false);
  const [text, setText] = useState(tweet.text);
  const [replies, setReplies] = useState([]);
  const [likes, setLikes] = useState(0);
  const location = useLocation();
  const username = sessionStorage.getItem('username');
  const token = sessionStorage.getItem('$myToken$');

  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const onDelete = () => {
    const confirm = window.confirm('Are you sure want to delete the tweet');
    if (confirm) {
      axios
        .delete(
          `http://localhost:9731/api/v1.0/tweets/${username}/delete/${tweet.id}`,
          {
            headers,
          }
        )
        .then((response) => {
          if (response.status === 200) {
            alert('Tweet deleted sucessfully');
            deleteTweet(response.data.data.id);
          }
        })
        .catch((err) => {
          if (err.response.status === 403) {
            alert('Login required to view this page, Please Login');
            nav('/');
          } else {
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
          }
        });
    }
  };

  const updateReplies = (replies) => {
    setReplies(replies);
  };
  const updateLikes = () => {
    setLikes((prev) => prev + 1);
    const body = {
      likes: likes,
    };
    axios
      .put(
        `http://localhost:9731/api/v1.0/tweets/${username}/like/${tweet.id}`,
        body,
        {
          headers,
        }
      )
      .then((response) => {
        if (response.status === 200) {
          setLikes(response.data.data.likes);
        }
      })
      .catch((err) => {
        if (err.response.status === 403) {
          alert('Login required to view this page, Please Login');
          nav('/');
        } else {
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
        }
      });
  };

  useEffect(() => {
    setReplies(tweet.replies);
    setLikes(tweet.likes);
  }, [tweet.replies, tweet.likes]);

  return (
    <div className='card fs-5 m-2' key={tweet.id}>
      <div className='card-body'>
        <p className='card-title'>
          <span className='badge rounded-pill bg-success fs-4'>
            {tweet.username.charAt(0).toUpperCase()}
          </span>
          <span className='m-2 fs-5'>{tweet.username}</span>
          <span className='fs-6 text-muted'>
            {moment(tweet.timestamp).fromNow()}
          </span>
        </p>

        {isEdit ? (
          <EditForm
            edit={(val) => {
              setIsEdit(val);
            }}
            ID={tweet.id}
            text={text}
            save={(text) => {
              setText(text);
            }}
          />
        ) : (
          <>
            <div className='card-text row'>
              <span className='col-8 fs-5'>{text}</span>
              <button
                className='btn btn-outline col-2 p-0'
                onClick={updateLikes}>
                <BsSuitHeart color={likes ? 'rgb(224, 36, 94)' : ''} />
              </button>
              <span className='col-2'>{likes}</span>
            </div>
            <div className='row mt-3'>
              <button
                type='button'
                className='btn btn-outline-info btn-sm m-2 col'
                data-bs-toggle='modal'
                data-bs-target='#staticBackdrop'>
                Reply
              </button>
              <ReplyModal updateReplies={updateReplies} tweetId={tweet.id} />
              {location.pathname === '/myTweets' && (
                <>
                  <button
                    type='buttton'
                    className='btn btn-outline-success btn-sm m-2 col'
                    onClick={() => {
                      setIsEdit(true);
                    }}>
                    Edit
                  </button>
                  <button
                    type='button'
                    className='btn btn-outline-danger btn-sm m-2 col'
                    onClick={onDelete}>
                    Delete
                  </button>
                </>
              )}
            </div>
          </>
        )}
      </div>
      {replies && replies.length > 0 && (
        <div className='card-footer text-muted'>
          {replies.map((reply, index) => (
            <Reply reply={reply} key={index} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Tweet;
