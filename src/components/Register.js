import React, { Component } from 'react';
import axios from 'axios';

class Register extends Component {
  // nav = useNavigate();
  state = {
    firstName: '',
    lastName: '',
    gender: '',
    dob: '',
    email: '',
    password: '',
    confirmPwd: '',
    isVaildFirstName: false,
    isVaildLastName: false,
    isVaildGender: false,
    isValidEmail: false,
    isValidPassword: false,
    isValidConfimPwd: {},
  };
  onChangeHandler = (e) => {
    this.setState((prevState) => {
      return { ...prevState, [e.target.name]: e.target.value };
    });

    if (e.target.name === 'firstName') {
      if (e.target.value.trim().length === 0) {
        this.setState({ isVaildFirstName: true });
      } else {
        this.setState({ isVaildFirstName: false });
      }
    } else if (e.target.name === 'lastName') {
      // console.log(e.target.value.trim().length);
      if (e.target.value.trim().length === 0) {
        this.setState({ isVaildLastName: true });
      } else {
        this.setState({ isVaildLastName: false });
      }
    } else if (e.target.name === 'email') {
      // console.log(e.target.value.trim().length);
      if (e.target.value.trim().length === 0) {
        this.setState({ isValidEmail: true });
      } else {
        this.setState({ isValidEmail: false });
      }
    } else if (e.target.name === 'gender') {
      this.setState((prev) => {
        return { ...prev, gender: e.target.value };
      });
    } else if (e.target.name === 'password') {
      if (e.target.value.trim().length === 0) {
        this.setState({ isValidPassword: true });
      } else {
        this.setState({ isValidPassword: false });
      }
    } else if (e.target.name === 'confirmPwd') {
      if (e.target.value.length === 0) {
        this.setState({
          isValidConfimPwd: { text: '***Confirm password cannot be empty***' },
        });
      } else {
        this.setState({
          isValidConfimPwd: false,
        });
      }
      let value = e.target.value;

      if (value !== this.state.password) {
        this.setState({
          isValidConfimPwd: {
            valid: true,
            text: '***Confirm password must match with the password***',
          },
        });
      } else {
        this.setState({
          isValidConfimPwd: {
            valid: false,
          },
        });
      }
    }
  };

  handleSignUp = (e) => {
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
      .post('http://localhost:9731/api/v1.0/tweets/register', registeredValues)
      .then((response) => {
        alert(response.data.message);
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
    if (redirect) this.props.history.push('/');
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

      isValidEmail,
      isValidPassword,
      isValidConfimPwd,
    } = { ...this.state };

    return (
      <>
        <div className='container my-2'>
          <div className='row justify-content-center'>
            <div className='col-6'>
              <form>
                <fieldset className='ml-auto'>
                  <div id='legend' className=''>
                    <legend>Register</legend>
                  </div>
                  <div className='mb-2'>
                    <label htmlFor='InputFirstname' className='form-label'>
                      Firstname
                    </label>
                    <input
                      type='text'
                      className='form-control'
                      name='firstName'
                      placeholder='Firstname'
                      value={firstName}
                      onChange={this.onChangeHandler}
                      required
                    />
                    {isVaildFirstName && <p>'***Firstname is required***'</p>}
                  </div>
                  <div className='mb-2'>
                    <label htmlFor='InputLastname' className='form-label'>
                      Lastname
                    </label>
                    <input
                      type='text'
                      className='form-control'
                      name='lastName'
                      placeholder='Lastname'
                      value={lastName}
                      onChange={this.onChangeHandler}
                      required
                    />
                    {isVaildLastName && '***Lastname is required***'}
                  </div>
                  <div className='mb-2'>
                    <label htmlFor='InputDOB' className='form-label'>
                      Date of Birth
                    </label>
                    <input
                      type='date'
                      className='form-control'
                      name='dob'
                      placeholder='Date of Birth'
                      value={dob}
                      onChange={this.onChangeHandler}
                    />
                  </div>
                  <div className='mb-2'>
                    <label htmlFor='InputGender' className='form-label'>
                      Gender
                    </label>
                    <div className='form-check form-check-inline mx-3 mt-2'>
                      <label className='form-check-label' htmlFor='gender'>
                        Male
                      </label>
                      <input
                        className='form-check-input'
                        type='radio'
                        name='gender'
                        id='male'
                        value='male'
                        onChange={this.onChangeHandler}
                      />
                    </div>
                    <div className='form-check form-check-inline'>
                      <label className='form-check-label' htmlFor=''>
                        Female
                      </label>
                      <input
                        className='form-check-input'
                        type='radio'
                        name='gender'
                        id='female'
                        value='female'
                        onChange={this.onChangeHandler}
                      />
                    </div>
                    <div className='form-check form-check-inline'>
                      <label className='form-check-label' htmlFor=''>
                        Other
                      </label>
                      <input
                        className='form-check-input'
                        type='radio'
                        name='gender'
                        id='Other'
                        value='Other'
                        onChange={this.onChangeHandler}
                      />
                    </div>
                  </div>
                  <div className='mb-2'>
                    <label htmlFor='InputEmail' className='form-label'>
                      Email
                    </label>
                    <input
                      type='email'
                      className='form-control'
                      id='InputEmail'
                      placeholder='Email'
                      name='email'
                      value={email}
                      onChange={this.onChangeHandler}
                      required
                    />
                    {isValidEmail && <div>'***Email is required***'</div>}
                  </div>
                  <div className='mb-2'>
                    <label htmlFor='InputPassword' className='form-label'>
                      Password
                    </label>
                    <input
                      type='password'
                      className='form-control'
                      name='password'
                      id='InputPassword'
                      placeholder='password'
                      value={password}
                      onChange={this.onChangeHandler}
                      required
                    />
                    {isValidPassword &&
                      '***Password must contain atleast 5 characters***'}
                  </div>
                  <div className='mb-3'>
                    <label
                      htmlFor='InputConfirmPassword'
                      className='form-label'>
                      Confirm Password
                    </label>
                    <input
                      type='password'
                      className='form-control'
                      name='confirmPwd'
                      id='InputcofirmPwd'
                      placeholder='confirm password'
                      value={confirmPwd}
                      onChange={this.onChangeHandler}
                      required
                    />
                    {isValidConfimPwd.text && isValidConfimPwd.text}
                  </div>
                  <div className='d-grid gap-2 d-md-block'>
                    <button
                      className='btn btn-success'
                      onClick={this.handleSignUp}
                      type='submit'>
                      Create Account
                    </button>
                    <button className='btn btn-success ms-5' type='reset'>
                      Reset
                    </button>
                  </div>
                  <br></br>
                  Already registered ?
                  <a href='/' className='link-primary mx-3'>
                    Sign In
                  </a>
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
