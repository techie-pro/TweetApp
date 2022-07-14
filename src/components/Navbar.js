import React from 'react';
import { Link } from 'react-router-dom';
const Navbar = ({ navList }) => {
  return (
    <>
      <nav className='navbar navbar-expand-md navbar-dark bg-dark'>
        <div className='container-fluid'>
          <div className='navbar-brand'>TweetApp</div>
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
              {navList.map((nav, index) => {
                if (nav.text === 'Logout') {
                  return (
                    <Link
                      className='nav-link m-2'
                      to={nav.route}
                      key={index}
                      onClick={() => {
                        sessionStorage.clear();
                      }}>
                      {nav.text}
                    </Link>
                  );
                } else {
                  return (
                    <Link className='nav-link m-2' to={nav.route} key={index}>
                      {nav.text}
                    </Link>
                  );
                }
              })}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
