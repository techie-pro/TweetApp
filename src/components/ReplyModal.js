import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ReplyModal = ({ updateReplies, tweetId }) => {
  const [text, setText] = useState([]);
  const [isValidText, setValidText] = useState({ valid: false, text: null });
  const [disabled, setDisabled] = useState(true);
  const nav = useNavigate();

  const onTextHandler = (e) => {
    setText(e.target.value);
    if (e.target.value.trim().length < 0) {
      setValidText({
        valid: false,
        text: 'Please tweet something before post',
      });
    } else if (e.target.value.trim().length > 144) {
      setValidText({
        valid: false,
        text: 'Tweet must not exceed 145 characters',
      });
    } else setValidText({ valid: true, text: null });
  };

  useEffect(() => {
    setDisabled(!isValidText.valid);
  }, [isValidText]);

  // useEffect(() => {
  //   setId(tweetId);
  // }, [tweetId]);

  const onReply = () => {
    const request = {
      text,
    };
    const headers = {
      Authorization: `Bearer ${sessionStorage.getItem('$myToken$')}`,
    };
    const username = sessionStorage.getItem('username');
    axios
      .post(
        `http://localhost:9731/api/v1.0/tweets/${username}/reply/${tweetId}`,
        request,
        {
          headers,
        }
      )
      .then((response) => updateReplies(response.data.data.replies))
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

  return (
    <div
      className='modal fade'
      id='staticBackdrop'
      data-bs-backdrop='static'
      data-bs-keyboard='false'
      tabIndex='-1'
      aria-labelledby='staticBackdropLabel'
      aria-hidden='true'
      key={tweetId}>
      <div className='modal-dialog'>
        <div className='modal-content'>
          <div className='modal-header'>
            <h5 className='modal-title' id='staticBackdropLabel'>
              Reply here
            </h5>
            <button
              type='button'
              className='btn-close'
              data-bs-dismiss='modal'
              aria-label='Close'></button>
          </div>
          <div className='modal-body'>
            <form action='' method='POST' autoFocus={true}>
              <fieldset className='ml-auto'>
                <div className='mb-2'>
                  <textarea
                    type='text'
                    className='form-control'
                    id='InputUsername'
                    placeholder='Reply Here'
                    name='text'
                    value={text}
                    onChange={onTextHandler}
                    autoFocus={true}
                    required
                  />
                  <div>{!isValidText.valid && isValidText.text}</div>
                </div>
              </fieldset>
            </form>
          </div>
          <div className='modal-footer'>
            <button
              type='button'
              className='btn btn-outline-danger'
              data-bs-dismiss='modal'>
              Close
            </button>
            <button
              type='button'
              className='btn btn-outline-success'
              data-bs-dismiss='modal'
              onClick={onReply}
              disabled={disabled}>
              Reply
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReplyModal;
