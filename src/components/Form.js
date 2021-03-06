import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Tweets from "./Tweets";
import { useNavigate } from "react-router-dom";

const Form = ({ initial }) => {
  const [text, setText] = useState("");
  const [isValidText, setValidText] = useState({ valid: false, text: null });
  const [disabled, setDisabled] = useState(true);
  const [tweetList, setTweetList] = useState([]);
  const nav = useNavigate();

  const onTextHandler = (e) => {
    setText(e.target.value);
    if (e.target.value.trim().length < 0) {
      setValidText({
        valid: false,
        text: "Please tweet something before post",
      });
    } else if (e.target.value.trim().length > 144) {
      setValidText({
        valid: false,
        text: "Tweet must not exceed 145 characters",
      });
    } else setValidText({ valid: true, text: null });
  };

  useEffect(() => {
    setDisabled(!isValidText.valid);
  }, [isValidText]);

  useEffect(() => {
    setTweetList(initial);
  }, [initial]);

  const addTweet = (tweet) => {
    setTweetList([...tweetList, tweet]);
  };

  const handlePost = (e) => {
    e.preventDefault();
    const request = {
      text,
    };
    const headers = {
      Authorization: `Bearer ${sessionStorage.getItem("$myToken$")}`,
    };
    const username = sessionStorage.getItem("username");
    axios
      .post(`http://localhost:9731/api/v1.0/tweets/${username}/add`, request, {
        headers,
      })
      .then((response) => addTweet(response.data.data && response.data.data))
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
  };

  return (
    <>
      <div className="container my-5">
        <div className="row justify-content-center">
          <div className="col-6">
            <form action="" method="POST">
              <fieldset className="ml-auto">
                <div id="legend" className="">
                  <legend className="">Tweet here</legend>
                </div>
                <div className="mb-2">
                  <textarea
                    type="text"
                    className="form-control"
                    id="InputUsername"
                    placeholder="Tweet Here"
                    name="text"
                    value={text}
                    onChange={onTextHandler}
                    required
                  />
                  <div>{!isValidText.valid && isValidText.text}</div>
                </div>

                <button
                  className="btn btn-success mx-auto"
                  type="submit"
                  onClick={handlePost}
                  disabled={disabled}
                >
                  Post
                </button>
                <br />
              </fieldset>
            </form>
          </div>
        </div>
      </div>
      <Tweets tweets={tweetList} />
    </>
  );
};

export default Form;
