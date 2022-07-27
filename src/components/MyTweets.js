import axios from "axios";
import React, { useEffect, useState } from "react";
import Tweets from "./Tweets";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../Constants";

const MyTweets = () => {
  const [tweets, setTweets] = useState([]);
  const nav = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem("$myToken$");
    const username = sessionStorage.getItem("username");
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    if (token) {
      axios
        .get(`${API_URL}/api/v1.0/tweets/${username}`, { headers })
        .then((response) => {
          setTweets(response.data.data);
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
      alert("Login required to view MyTweets, Please Login");
      nav("/");
    }
  }, [nav]);
  return (
    <div>
      <Tweets tweets={tweets} />
    </div>
  );
};

export default MyTweets;
