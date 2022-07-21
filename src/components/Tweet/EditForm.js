import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../api/axios';

const EditForm = ({ text, edit, ID, save }) => {
  const [disabled, setDisabled] = useState(true);
  const [editedText, setEditedText] = useState();
  const [isValidText, setValidText] = useState({ valid: false, text: null });
  const nav = useNavigate();

  useEffect(() => {
    setDisabled(!isValidText.valid);
  }, [isValidText]);

  useEffect(() => {
    setEditedText(text);
  }, [text]);

  const onTextHandler = (e) => {
    setEditedText(e.target.value);
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
  const username = sessionStorage.getItem('username');
  const token = sessionStorage.getItem('$myToken$');

  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const updateTweet = () => {
    const request = {
      text: editedText,
    };
    axios
      .put(`/api/v1.0/tweets/${username}/update/${ID}`, request, {
        headers,
      })
      .then((response) => {
        if (response.status === 201) {
          console.log(response.data.data.text);
          save(response.data.data.text);
          alert('Tweet updated sucessfully');
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
    edit(false);
  };

  return (
    <>
      <div className='row'>
        <textarea
          type='text'
          className='form-control'
          id='InputUsername'
          placeholder='Tweet Here'
          name='text'
          value={editedText}
          onChange={onTextHandler}
          required
        />
      </div>
      <div className='row m-2'>
        <button
          className='btn btn-outline-success btn-sm col'
          onClick={updateTweet}
          disabled={disabled}>
          Save
        </button>
        <button
          className='btn btn-outline-success btn-sm col'
          onClick={() => {
            edit(false);
          }}>
          Cancel
        </button>
      </div>
    </>
  );
};

export default EditForm;
