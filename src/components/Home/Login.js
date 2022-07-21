import React from 'react';
import { useState, useEffect } from 'react';
import axios from '../../api/axios';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import useAuth from './../../Hooks/useAuth';

const Login_URL = '/api/v1.0/tweets/login';

const Login = () => {
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/home';
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [disabled, setDisabled] = useState(true);
  const [isValidUser, setIsValidUser] = useState({});
  const [isValidPassword, setIsValidPassword] = useState({});

  const onChangeHandler = (e) => {
    if (e.target.name === 'username') {
      setUserName(e.target.value);
      if (
        !e.target.value
          .trim()
          .match('^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$')
      )
        setIsValidUser({
          valid: false,
          text: 'username must be valid email',
        });
      else setIsValidUser({ valid: true, text: null });
    } else {
      setPassword(e.target.value);
      if (e.target.value.trim().length < 8 || e.target.value.trim().length > 25)
        setIsValidPassword({
          valid: false,
          text: 'Password must be 8 to 25 characters long',
        });
      else
        setIsValidPassword({
          valid: true,
          text: null,
        });
    }
  };
  useEffect(() => {
    setDisabled(!(isValidUser.valid && isValidPassword.valid));
  }, [isValidUser, isValidPassword]);

  const onLoginHandler = async (e) => {
    e.preventDefault();
    const cred = {
      username,
      password,
    };
    console.log(
      'inside login handler post data : cred :' + JSON.stringify(cred)
    );
    const headers = { 'Content-Type': 'application/json' };

    await axios
      .post(Login_URL, cred, headers)
      .then((response) => {
        console.log(response);
        const accessToken = response?.data?.data?.accessToken;
        setAuth({ username, accessToken });
        console.log(auth);
        navigate(from, { replace: true });
      })
      .catch((err) => {
        if (err.response.data) {
          let message = err.response.data.message;
          let errors = err.response.data.errors;
          let pretty = `${message}\n`;
          for (const property in errors) {
            pretty = pretty.concat(`\t${errors[property]}\n`);
          }
          setUserName('');
          setPassword('');
          alert(pretty);
        } else {
          alert(err.message + ' Try again after some time');
        }
      });
  };

  return (
    <div className='container my-5'>
      <div className='row justify-content-center'>
        <div className='col-6'>
          <form action='' method='POST'>
            <fieldset className='ml-auto'>
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
                <div>{!isValidUser.valid && isValidUser.text}</div>
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
                {!isValidPassword.valid && isValidPassword.text}
              </div>
              <button
                className='btn btn-success mx-auto'
                type='submit'
                onClick={onLoginHandler}
                disabled={disabled}>
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
