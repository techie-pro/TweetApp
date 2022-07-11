import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
const Navbar = ({isLoggedIn,setIsLoggedIn}) => {

  useEffect(() => {
   
  });

  return (
    <>
      <nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
        <div className='container-fluid'>
          <Link className='navbar-brand' to='/#'>
            TweetApp
          </Link>
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
              {isLoggedIn ? (
                <>
                  <Link className='nav-link m-2' to='/myTweets'>
                    My Tweets
                  </Link>
                  <Link className='nav-link m-2' to='/allUsers'>
                    All Users
                  </Link>
                  <Link
                    className='nav-link m-2'
                    to='/'
                    onClick={() => {
                      setIsLoggedIn(true)
                      sessionStorage.clear();
                    }}>
                    Logout
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    className='nav-link active m-2'
                    aria-current='page'
                    to='/'>
                    Login
                  </Link>
                  <Link className='nav-link m-2' to='/register'>
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
