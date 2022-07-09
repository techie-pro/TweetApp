import React from 'react';
// import { Link } from 'react-router-dom';
const Navbar = () => {
  return (
    <>
      <nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
        <div className='container-fluid'>
          <a className='navbar-brand' href='/#'>
            TweetApp
          </a>
          <button
            className='navbar-toggler'
            type='button'
            data-bs-toggle='collapse'
            data-bs-target='#navbarNavAltMarkup'
            aria-controls='navbarNavAltMarkup'
            aria-expanded='false'
            aria-label='Toggle navigation'>
            <span className='navbar-toggler-icon'></span>
          </button>
          <div className='collapse navbar-collapse' id='navbarNavAltMarkup'>
            <div className='navbar-nav mx-6'>
              <a className='nav-link active m-2' aria-current='page' href='/'>
                Login
              </a>
              <a className='nav-link m-2' href='/register'>
                Register
              </a>
              <a className='nav-link m-2' href='/#'>
                Tweets
              </a>
              <a className='nav-link m-2' href='/#'>
                All Users
              </a>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
