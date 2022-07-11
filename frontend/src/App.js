import './App.css';
import { Login, Register } from './Auth';
import React, { useState, useEffect } from 'react';
import axios from './api/axios';
import { Todo } from './Todo';

//SIMPLE SINGLE MERN PAGE APP WITH BACKEND SERVER
function App() {
  //Pages
  const [auth, setAuth] = useState(true); //Auth element ON-OFF
  const [addScreen, setAddScreen] = useState(false); //Add element ON-OFF

  //Records
  const [state, setState] = useState('login'); //Used for record and swithc state LOGIN-REGISTRATION
  const [newItem, setNewItem] = useState(''); //Title of new todo, recorded by add input
  const [myUserId, setMyUserId] = useState(''); //Id of current logged in user

  const [myTodos, setMyTodos] = useState([]);
  useEffect(() => {
    GetTodos();
  }, [myUserId]);

  const changeAuth = () => {
    if (state === 'login') {
      return (
        <Login
          setAuth={setAuth}
          setMyUserId={setMyUserId}
          getTodos={GetTodos}
        />
      );
    } else if (state === 'register') {
      return <Register setState={setState} />;
    }
  };

  //SWITCH PAGES
  const LogRegSwitch = () => {
    if (state === 'register') {
      return (
        <p className="login-link" onClick={() => setState('login')}>
          Login
        </p>
      );
    } else if (state === 'login') {
      return (
        <p className="register-link" onClick={() => setState('register')}>
          Register
        </p>
      );
    }
  };

  //ADD BUTTON
  const AddTodo = async () => {
    try {
      const response = await axios({
        method: 'post',
        url: `/todo/${myUserId}`,
        data: {
          title: newItem,
        },
      });
      setMyTodos((previous) => [...previous, response.data]);
      setAddScreen(false);
    } catch (err) {
      console.log('cant post');
    }
  };

  //GETMYTODOS
  const GetTodos = async () => {
    try {
      console.log(`user is trying fetch todos of user ' + ${myUserId} `);
      const response = await axios({
        method: 'get',
        url: `/user/todos/${myUserId}`,
      });
      setMyTodos(response.data);
      console.log('Todos are fetched!');
    } catch (err) {
      console.log('Cant fetch todos!');
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="logo">
          <h3>TODOIST</h3>
        </div>
        <h5 className="logout" onClick={() => setAuth(true)} hidden={auth}>
          LOGOUT
        </h5>
      </header>
      <div className="App-body">
        {addScreen && (
          <div className="add-screen">
            <button className="add-item" onClick={() => setAddScreen(false)}>
              <h1>X</h1>
            </button>
            <div>
              <input onChange={(e) => setNewItem(e.target.value)}></input>
              <button className="add-button" onClick={() => AddTodo()}>
                ADD
              </button>
            </div>
          </div>
        )}
        <div className="auth-form-section" hidden={!auth}>
          {LogRegSwitch()}
          {changeAuth()}
        </div>
        <div className="my-todo-section" hidden={auth}>
          {myTodos.map((item) => (
            <Todo
              key={item._id}
              item={item}
              myUserId={myUserId}
              setMyTodos={setMyTodos}
              myTodos={myTodos}
            />
          ))}
          <div className="add-item" onClick={() => setAddScreen(true)}>
            <h1>+</h1>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
