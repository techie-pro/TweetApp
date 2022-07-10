import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ForgotPassword = () => {
  const [username, setUserName] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [isCurrentPassword, setIsCurrentPassword] = useState(false);
  const [isValidNewPassword, setIsValidNewPassword] = useState(false);
  const [isValidUser, setIsValidUser] = useState(false);

  const nav = useNavigate();

  const onChangeHandler = (e) => {
    if (e.target.name === 'username') {
      setUserName(e.target.value);
      if (e.target.value.trim().length < 3) setIsValidUser(true);
      else setIsValidUser(false);
    } else if (e.target.name === 'currentPassword') {
      setCurrentPassword(e.target.value);
      if (e.target.value.trim().length < 5) setIsCurrentPassword({
        valid: true,
        text: 'please enter valid password, must contain atleast 6 characters',
      });
      else setIsCurrentPassword(false);
    } else if (e.target.name === 'newPassword') {
      setNewPassword(e.target.value);
      if (e.target.value.trim().length < 5)
        setIsValidNewPassword({
          valid: true,
          text: 'New password must contain atleast 6 characters',
        });
      else if (e.target.value === currentPassword)
        setIsValidNewPassword({
          valid: true,
          text: 'New password must not be same as old password',
        });
      else
        setIsValidNewPassword({
          valid: false,
        });
    }
  };

  const onLoginHandler = async (e) => {
    const cred = {
      username,
      currentPassword,
      newPassword,
    };

    await axios
      .post(`localhost:9731/api/v1.0/tweets/${username}/forgot`, cred)
      .then((response) => {
        if (response.status === 401) alert(response?.message);
        else alert('Password changed Successfully');
      });
    nav(-1);
  };

  return (
    <div className='container my-5'>
      <div className='row justify-content-center'>
        <div className='col-6'>
          <form action='' method='POST'>
            <fieldset className='ml-auto'>
              <div id='legend' className=''>
                <legend className=''>ForgotPassword</legend>
              </div>
              <div className='mb-2'>
                <label htmlFor='InputFirstname' className='form-label'>
                  Username
                </label>
                <input
                  type='email'
                  className='form-control'
                  id='InputUsername'
                  placeholder='Username'
                  name='username'
                  value={username}
                  onChange={onChangeHandler}
                  required
                />
                {isValidUser && 'please enter valid username'}
              </div>
              <div className='mb-2'>
                <label htmlFor='InputLastname' className='form-label'>
                  Current Password
                </label>
                <input
                  type='password'
                  name='currentPassword'
                  className='form-control'
                  placeholder='password'
                  value={currentPassword}
                  onChange={onChangeHandler}
                  required
                />
                {isCurrentPassword && 'please enter valid password'}
              </div>
              <div className='mb-2'>
                <label htmlFor='InputLastname' className='form-label'>
                  New Password
                </label>
                <input
                  type='password'
                  name='newPassword'
                  className='form-control'
                  placeholder='password'
                  value={newPassword}
                  onChange={onChangeHandler}
                  required
                />
                {isValidNewPassword.valid && isValidNewPassword.text}
              </div>
              <button
                className='btn btn-success mx-auto mt-3'
                type='submit'
                onClick={onLoginHandler}>
                Change password
              </button>
              <br />
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
