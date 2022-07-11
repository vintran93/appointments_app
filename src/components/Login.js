import React, { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { useAlert } from 'react-alert';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import CheckButton from 'react-validation/build/button';
import { login } from '../actions/auth';


const required = value => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
  return '';
};

function Login() {
  // allows you to persist values between renders
  // It can be used to store a mutable value that does not cause a re-render when updated
  const form = useRef();
  const checkBtn = useRef();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  // Allows you to extract data from the Redux store state, using a selector function
  const { isLoggedIn } = useSelector(state => state.auth);
  const { message } = useSelector(state => state.message);

  const alert = useAlert();
  // This hook returns a reference to the dispatch function from the Redux store. 
  // You may use it to dispatch actions as needed.
  const dispatch = useDispatch();

  const onChangeEmail = e => {
    const emailInput = e.target.value;
    setEmail(emailInput);
    // console.log(email)
    // state has not finished updating yet when running console.log
    // updating state in react is asynchronous, not immediately updated or we have not finished waiting for the update
    // asynchronous means we are seeing the previous state each time there is an input
    // if react was synchronous, it may lead to problems such as bad user experience or browswer lock ups
    // updating state in react asynchronous, not immediately updated
    // rerendering is expensive operation
    // asynchronous , seeing previous state each time input
    // https://reactjs.org/docs/state-and-lifecycle.html
    // https://reactjs.org/docs/hooks-state.html
  };

  
  

  const onChangePassword = e => {
    const passwordValue = e.target.value;
    setPassword(passwordValue);
    // console.log(password) 
  };

  const handleLogin = e => {
    e.preventDefault();

    setLoading(true);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      dispatch(login(email, password))
        .then(() => {
          setLoading(false);
          alert.show('Login successful', {
            type: 'success',
            timeout: 5000,
          });
        })
        .catch(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  };

  if (isLoggedIn) {
    return <Navigate to="/doctors" />;
  }

  return (
    <div className="col-md-12">
      <div className="card card-container">
        <img
          src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
          alt="profile-img"
          className="profile-img-card"
        />

        <Form onSubmit={handleLogin} ref={form}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <Input
              id="email"
              type="text"
              className="form-control"
              name="email"
              value={email}
              onChange={onChangeEmail}
              validations={[required]}
            />
          </div> 
          {/* controlled input value is tied to state of component */}
          {/* uncontrolled input value tied to the DOM */}

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <Input
              type="password"
              className="form-control"
              name="password"
              value={password}
              onChange={onChangePassword}
              validations={[required]}
            />
          </div>

          <div className="form-group">
            <button className="btn btn-primary btn-block" disabled={loading} type="submit">
              {loading && (
                <span className="spinner-border spinner-border-sm" />
              )}
              <span>Login</span>
            </button>
          </div>

          {message && (
            <div className="form-group">
              <div className="alert alert-danger" role="alert">
                {message}
              </div>
            </div>
          )}
          <CheckButton style={{ display: 'none' }} ref={checkBtn} /> 
        </Form>
      </div>
    </div>
  );
};

export default Login;
