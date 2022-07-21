import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useAxiosPrivate from '../Hooks/useAxiosPrivate';

import useRefreshToken from './../Hooks/useRefreshToken';
const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();
  const refresh = useRefreshToken();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getUsers = async () => {
      await axiosPrivate
        .get(`/api/v1.0/tweets/users/all`, {
          signal: controller.signal,
        })
        .then((response) => isMounted && setUsers(response.data.data))
        .catch((err) => {
          if (err.response.status === 403) {
            alert('Login required to view this page, Please Login');
            navigate('/login', { state: { from: location }, replace: true });
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
    getUsers();
    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [location, navigate, axiosPrivate]);
  return (
    <>
      <div className='container my-5'>
        <div className='row justify-content-center'>
          <div className='col-6'>
            <h2>Users</h2>
            {users.map((u) => (
              <div key={u.id}>
                <hr />
                <div className='card'>
                  <div className='card-body'>
                    <p className='card-title'>
                      <span className='badge rounded-pill bg-success fs-6'>
                        {u.email.charAt(0).toUpperCase()}
                      </span>
                    </p>
                    <h6>
                      <span>{u.firstName}</span>
                      <span>{u.lastName}</span>
                    </h6>
                    <span>{u.email}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <button className='btn btn-success' onClick={refresh}>
        Refresh
      </button>
    </>
  );
};

export default AllUsers;
