import React, { useEffect, useState } from "react";
import Form from "./Form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../Constants";
const HomePage = () => {
  const [tweets, setTweets] = useState([]);

  const nav = useNavigate();

  const username = sessionStorage.getItem("username");

  useEffect(() => {
    const token = sessionStorage.getItem("$myToken$");
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    if (token) {
      axios
        .get(`${API_URL}/api/v1.0/tweets/all`, { headers })
        .then((response) => {
          response.data.data && setTweets(response.data.data);
        })

        .catch((err) => {
          if (err.response.status === 403) {
            alert("Login required to view this page, Please Login");
            nav("/");
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
              alert(err.message + " Try again after some time");
            }
          }
        });
    } else {
      alert("Login required to view Home, Please Login");
      nav("/");
    }
  }, [nav]);

  return (
    <>
      <h1 className="h1">
        Welcome {username && username.split("@")[0].toUpperCase()}
      </h1>
      <Form initial={tweets} />
    </>
  );
};

export default HomePage;
