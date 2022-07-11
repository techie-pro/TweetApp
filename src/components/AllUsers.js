import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const nav = useNavigate();
  console.log('Allusers');
  useEffect(() => {
    console.log('All Users inside useEffect');
    const token = sessionStorage.getItem('$myToken$');
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    if (token) {
      axios
        .get(`http://localhost:9731/api/v1.0/tweets/users/all`, { headers })
        .then((response) => setUsers(response.data.data))
        .catch((err) => {
          if (err.response.status === 403) {
            alert('Login required to view this page, Please Login');
            nav('/');
          } else {
            let message = err.response.data.message;
            let errors = err.response.data.errors;

            let pretty = `${message}\n`;
            for (const property in errors) {
              pretty = pretty.concat(`\t${errors[property]}\n`);
            }

            alert(pretty);
          }
        });
    } else {
      alert('Login required to view All Users, Please Login');
      nav('/');
    }
  }, [users, nav]);
  return (
    <>
      <div className='container my-5'>
        <div className='row justify-content-center'>
          <div className='col-6'>
            <h2>Users</h2>
            {users.map((u) => (
              <div className='card' key={u.id}>
                <div className='card-body'>
                  <p className='card-title'>
                    <span className='badge rounded-pill bg-success fs-6'>
                      {u.email.charAt(0)}
                    </span>
                  </p>
                  <h6>
                    <span>{u.firstName}</span>
                    <span>{u.lastName}</span>
                  </h6>
                  <span>{u.email}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default AllUsers;
