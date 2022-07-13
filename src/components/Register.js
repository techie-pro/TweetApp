import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

class Register extends Component {
  submitDisabled = true;
  resetDisabled = true;
  state = {
    firstName: "",
    lastName: "",
    gender: "",
    dob: "",
    email: "",
    password: "",
    confirmPwd: "",
    isVaildFirstName: { text: null, valid: true },
    isVaildLastName: { text: null, valid: true },
    isVaildGender: { text: null, valid: true },
    isValidEmail: { text: null, valid: true },
    isValidPassword: { text: null, valid: true },
    isValidConfimPwd: { text: null, valid: true },
  };

  getSnapshotBeforeUpdate() {}

  componentDidUpdate() {
    this.submitDisabled =
      this.state.isVaildFirstName.valid &&
      this.state.isVaildLastName.valid &&
      this.state.isVaildGender.valid &&
      this.state.isValidEmail.valid &&
      this.state.isValidPassword.valid &&
      this.state.isValidConfimPwd.valid;
    this.resetDisabled = !this.submitDisabled;
  }

  onChangeHandler = (e) => {
    console.log(e);
    this.setState((prevState) => {
      return { ...prevState, [e.target.name]: e.target.value };
    });

    if (e.target.name === "firstName") {
      if (!e.target.value.match("^[a-zA-Z][a-zA-Z ]*$")) {
        this.setState({
          isVaildFirstName: {
            valid: false,
            text: "Invalid First Name",
          },
        });
        e.target.style.border = "red";
      } else {
        this.setState({ isVaildFirstName: { valid: true, text: null } });
        e.target.style.border = "";
      }
    } else if (e.target.name === "lastName") {
      if (
        e.target.value.length > 0 &&
        !e.target.value.match("^[a-zA-Z][a-zA-Z ]*$")
      ) {
        this.setState({
          isVaildLastName: {
            valid: false,
            text: "Invalid Last Name",
          },
        });
        e.target.style.border = "red";
      } else {
        this.setState({ isVaildLastName: { valid: true, text: null } });
        e.target.style.border = "";
      }
    } else if (e.target.name === "email") {
      if (
        !e.target.value
          .trim()
          .match("^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$")
      ) {
        this.setState({
          isValidEmail: {
            valid: false,
            text: "Invalid Email Address",
          },
        });
        e.target.style.border = "red";
      } else {
        this.setState({ isValidEmail: { valid: true, text: null } });
        e.target.style.border = "";
      }
    } else if (e.target.name === "gender") {
      this.setState({
        isVaildGender:
          e.target.value === ""
            ? { valid: false, text: "Please select gender" }
            : { valid: true, text: null },
      });
    } else if (e.target.name === "password") {
      if (
        e.target.value.includes(" ") ||
        e.target.value.length < 8 ||
        e.target.value.length > 25
      )
        this.setState({
          isValidPassword: {
            valid: false,
            text: "Password must be 8 to 25 characters long",
          },
        });
      else
        this.setState({
          isValidPassword: {
            valid: true,
            text: null,
          },
        });
    } else if (e.target.name === "confirmPwd") {
      let value = e.target.value;
      if (value !== this.state.password) {
        this.setState({
          isValidConfimPwd: {
            valid: false,
            text: "Confirm password must match with the password",
          },
        });
      } else {
        this.setState({
          isValidConfimPwd: {
            valid: true,
            text: null,
          },
        });
      }
    }
  };

  handleSignUp = (e) => {
    if (
      !(
        this.state.isVaildFirstName.valid &&
        this.state.isVaildLastName.valid &&
        this.state.isVaildGender.valid &&
        this.state.isValidEmail.valid &&
        this.state.isValidPassword.valid &&
        this.state.isValidConfimPwd.valid
      )
    ) {
      return;
    }
    e.preventDefault();
    const { firstName, lastName, gender, dob, email, password } = {
      ...this.state,
    };
    const registeredValues = {
      firstName,
      lastName,
      gender,
      dob,
      email,
      password,
    };
    console.log(registeredValues);
    let redirect = false;
    axios
      .post("http://localhost:9731/api/v1.0/tweets/register", registeredValues)
      .then((response) => {
        alert(response.data.message);
        this.setState({
          firstName: "",
          lastName: "",
          gender: "",
          dob: "",
          email: "",
          password: "",
          confirmPwd: "",
          isVaildFirstName: { text: null, valid: true },
          isVaildLastName: { text: null, valid: true },
          isVaildGender: { text: null, valid: true },
          isValidEmail: { text: null, valid: true },
          isValidPassword: { text: null, valid: true },
          isValidConfimPwd: { text: null, valid: true },
        });
        redirect = true;
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
    if (redirect) this.props.history.push("/");
  };

  render() {
    const {
      firstName,
      lastName,
      // gender,
      dob,
      email,
      password,
      confirmPwd,
      isVaildFirstName,
      isVaildLastName,
      isVaildGender,
      isValidEmail,
      isValidPassword,
      isValidConfimPwd,
    } = { ...this.state };

    return (
      <>
        <div className="container my-2">
          <div className="row justify-content-center">
            <div className="col-6">
              <form>
                <fieldset className="ml-auto">
                  <div className="mb-2">
                    <label htmlFor="firstName" className="form-label">
                      Firstname
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="firstName"
                      placeholder="Firstname"
                      value={firstName}
                      onChange={this.onChangeHandler}
                      required
                    />
                    {isVaildFirstName.text && isVaildFirstName.text}
                  </div>
                  <div className="mb-2">
                    <label htmlFor="InputLastname" className="form-label">
                      Lastname
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="lastName"
                      placeholder="Lastname"
                      value={lastName}
                      onChange={this.onChangeHandler}
                      required
                    />
                    {isVaildLastName.text && isVaildLastName.text}
                  </div>
                  <div className="mb-2">
                    <label htmlFor="InputDOB" className="form-label">
                      Date of Birth
                    </label>
                    <input
                      type="date"
                      className="form-control"
                      name="dob"
                      placeholder="Date of Birth"
                      value={dob}
                      onChange={this.onChangeHandler}
                    />
                  </div>
                  <div className="mb-2">
                    <label htmlFor="InputGender" className="form-label">
                      Gender
                    </label>
                    <div className="form-check form-check-inline mx-3 mt-2">
                      <label className="form-check-label" htmlFor="gender">
                        Male
                      </label>
                      <input
                        className="form-check-input"
                        type="radio"
                        name="gender"
                        id="male"
                        value="male"
                        onChange={this.onChangeHandler}
                      />
                    </div>
                    <div className="form-check form-check-inline">
                      <label className="form-check-label" htmlFor="">
                        Female
                      </label>
                      <input
                        className="form-check-input"
                        type="radio"
                        name="gender"
                        id="female"
                        value="female"
                        onChange={this.onChangeHandler}
                      />
                    </div>
                    <div className="form-check form-check-inline">
                      <label className="form-check-label" htmlFor="">
                        Other
                      </label>
                      <input
                        className="form-check-input"
                        type="radio"
                        name="gender"
                        id="Other"
                        value="Other"
                        onChange={this.onChangeHandler}
                      />
                    </div>
                    {isVaildGender.text && isVaildGender.text}
                  </div>
                  <div className="mb-2">
                    <label htmlFor="InputEmail" className="form-label">
                      Email
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="InputEmail"
                      placeholder="Email"
                      name="email"
                      value={email}
                      onChange={this.onChangeHandler}
                      required
                    />
                    {isValidEmail.text && isValidEmail.text}
                  </div>
                  <div className="mb-2">
                    <label htmlFor="InputPassword" className="form-label">
                      Password
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      name="password"
                      id="InputPassword"
                      placeholder="password"
                      value={password}
                      onChange={this.onChangeHandler}
                      required
                    />
                    {isValidPassword.text && isValidPassword.text}
                  </div>
                  <div className="mb-3">
                    <label
                      htmlFor="InputConfirmPassword"
                      className="form-label"
                    >
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      name="confirmPwd"
                      id="InputcofirmPwd"
                      placeholder="confirm password"
                      value={confirmPwd}
                      onChange={this.onChangeHandler}
                      required
                    />
                    {isValidConfimPwd.text && isValidConfimPwd.text}
                  </div>
                  <div className="d-grid gap-2 d-md-block">
                    <button
                      className="btn btn-success"
                      onClick={this.handleSignUp}
                      type="submit"
                      disabled={this.submitDisabled}
                    >
                      Create Account
                    </button>
                    <button
                      className="btn btn-success ms-5"
                      type="reset"
                      disabled={this.resetDisabled}
                    >
                      Reset
                    </button>
                  </div>
                  <br></br>
                  Already registered ?
                  <Link to="/" className="link-primary mx-3">
                    Sign In
                  </Link>
                </fieldset>
              </form>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Register;
