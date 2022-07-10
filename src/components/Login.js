import React from 'react';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [isValidUser, setIsValidUser] = useState(false);
  const [isValidPassword, setIsValidPassword] = useState(false);
  const nav = useNavigate();
  const [token, setToken] = useState('');

  const onChangeHandler = (e) => {
    if (e.target.name === 'username') {
      setUserName(e.target.value);
      if (e.target.value.trim().length < 3) setIsValidUser(true);
      else setIsValidUser(false);
    } else {
      setPassword(e.target.value);
      if (e.target.value.trim().length < 5)
        setIsValidPassword({
          valid: true,
          text: 'please enter valid password, must contain atleast 6 characters',
        });
      else
        setIsValidPassword({
          valid: false,
        });
    }
  };

  const onLoginHandler = async (e) => {
    const cred = {
      userName,
      password,
    };

    await axios
      .post('http://localhost:9731/api/v1.0/tweets/login', cred)
      .then((response) => {
        setToken(response.authToken);
      })
      .catch((err, response) => {
        alert(response.message);
      });

    nav(`/home/${token}`);
  };

  return (
    <div className='container my-5'>
      <div className='row justify-content-center'>
        <div className='col-6'>
          <form action='' method='POST'>
            <fieldset className='ml-auto'>
              <div id='legend' className=''>
                <legend className=''>Login</legend>
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
                  value={userName}
                  onChange={onChangeHandler}
                  required
                />
                {isValidUser && 'please enter valid username'}
              </div>
              <div className='mb-2'>
                <label htmlFor='InputLastname' className='form-label'>
                  Password
                </label>
                <input
                  type='password'
                  name='password'
                  className='form-control'
                  id='InputLastname'
                  placeholder='password'
                  value={password}
                  onChange={onChangeHandler}
                  required
                />
                {isValidPassword.valid && isValidPassword.text}
              </div>
              <button
                className='btn btn-success mx-auto'
                type='submit'
                onClick={onLoginHandler}>
                Login
              </button>
              <br />
              <Link to='/forgotpassword' className='link-primary  mt-2'>
                Forgot password !
              </Link>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
