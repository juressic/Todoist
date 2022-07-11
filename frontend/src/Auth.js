import React, { useState, useRef, useEffect } from 'react';
import axios from './api/axios';
import AuthContext from './context/AuthProvider';

export function Login({ setAuth, setMyUserId, getTodos }) {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [errMsg, setErrMsg] = useState();
  const errRef = useRef();
  const userRef = useRef();
  const [success, setSuccess] = useState(true);

  /*useEffect(() => {
    userRef(username);
  }, []);*/

  useEffect(() => {
    setErrMsg('');
  }, [username, password]);

  const userLogin = async (e) => {
    // e.preventDefault();
    try {
      const response = await axios({
        method: 'post',
        url: '/login',
        data: {
          username: username,
          password: password,
        },
      });

      //const accessToken = response?.data?.accessToken;
      //const roles = response?.data?.roles;
      //setAuth({ username, password, roles, accessToken });
      await setMyUserId(response.data._id);
      console.log('User ' + response.data._id + ' has logged in!');
      setSuccess(true);
      setAuth(false);
    } catch (err) {
      if (!err?.response) {
        setErrMsg('No Server Response');
      } else if (err.response?.status === 400) {
        setErrMsg('Missing Username or Password');
      } else if (err.response?.status === 401) {
        setErrMsg('Unauthorized');
      } else {
        setErrMsg('Login Failed');
      }
      console.log('Cant loggin');
      setSuccess(false);
      //console.log(errMsg);
      //errRef.current.focus();
    }
  };

  return (
    <div className="login-form">
      <p>Login</p>
      <input
        placeholder="Username"
        onChange={(e) => setUsername(e.target.value)}
      ></input>
      <input
        placeholder="Password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      ></input>
      <button
        className="login-btn"
        onClick={() => {
          userLogin();
        }}
      >
        Login
      </button>
      <p className="errorLogin" hidden={success}>
        Username or password are not correct!
      </p>
    </div>
  );
}

export function Register({ setState }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const addUser = () => {
    axios({
      method: 'post',
      url: '/register',
      data: {
        username: username,
        password: password,
        email: email,
      },
    }).then((response) => {
      console.log(response.data);
    });
  };

  return (
    <div className="register-form">
      <p>Sign Up</p>
      <input
        placeholder="Username"
        autoComplete="off"
        onChange={(e) => {
          setUsername(e.target.value);
        }}
      ></input>
      <input
        placeholder="Password"
        type="password"
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      ></input>
      <input
        placeholder="Email"
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      ></input>
      <button
        className="login-btn"
        onClick={() => {
          addUser();
          setState('login');
        }}
      >
        Register
      </button>
      <p className="errorLogin" hidden={true}>
        Username already exists!
      </p>
    </div>
  );
}
