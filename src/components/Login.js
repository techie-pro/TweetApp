import React from 'react';

const Login = () => {
  return (
    <div class='container my-5'>
      <div class='row justify-content-center'>
        <div class='col-6'>
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
                  required
                />
              </div>
              <div className='mb-2'>
                <label htmlFor='InputLastname' className='form-label'>
                  Password
                </label>
                <input
                  type='password'
                  className='form-control'
                  id='InputLastname'
                  placeholder='password'
                  required
                />
              </div>
              <button className='btn btn-success ms-auto' type='submit'>
                Login
              </button>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
