import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
const Tweet = ({ tweet }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [text, setText] = useState(tweet.text);
  const [disabled, setDisabled] = useState(true);
  const [isValidText, setValidText] = useState({ valid: false, text: null });
  const location = useLocation();

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

  const updateTweet = () => {
    const request = {
      text,
    };
    const headers = {
      Authorization: `Bearer ${sessionStorage.getItem("$myToken$")}`,
    };
    const username = sessionStorage.getItem("username");
    axios
      .put(
        `http://localhost:9731/api/v1.0/tweets/${username}/update/${tweet.id}`,
        request,
        {
          headers,
        }
      )
      .then((response) => {
        if (response.status === 200) alert("Tweet updated sucessfully");
      })
      .catch((err) => {
        console.log(err);
        let message = err.response.data.message;
        let errors = err.response.data.errors;
        let pretty = `${message}\n`;
        for (const property in errors) {
          pretty = pretty.concat(`\t${errors[property]}\n`);
        }
        alert(pretty);
      });
    setIsEdit(false);
  };

  useEffect(() => {
    setDisabled(!isValidText.valid);
  }, [isValidText, disabled]);

  return (
    <div className="card" key={tweet.id}>
      <div className="card-body">
        <p className="card-title">
          <span className="badge rounded-pill bg-success fs-6">
            {tweet.username.charAt(0)}
          </span>
          <span className="m-2">{tweet.username}</span>
          <span> {moment(tweet.timestamp).fromNow()}</span>
        </p>

        {isEdit ? (
          <>
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
            {}
            <button
              className="btn btn-outline-success btn-sm"
              onClick={updateTweet}
              disabled={disabled}
            >
              Save
            </button>
          </>
        ) : (
          <>
            <h6 className="card-text">{text}</h6>

            <button
              className="btn btn-outline-success btn-sm m-2"
              onClick={() => {
                setIsEdit(true);
              }}
            >
              Edit
            </button>
            {location.pathname === "/myTweets" && (
              <button
                className="btn btn-outline-danger btn-sm m-2"
                onClick={() => {
                  setIsEdit(true);
                }}
              >
                Delete
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Tweet;
