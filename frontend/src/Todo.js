import React, { useState } from 'react';
import axios from './api/axios';

export const Todo = (props) => {
  const [complete, setComplete] = useState(props.item.isCompleted);
  const [editScreen, setEditScreen] = useState(false);
  const [title, setTitle] = useState(props.item.title);
  const [editInput, setEditInput] = useState('');

  //UPDATE COMPLETE
  const UpdateComplete = async (id) => {
    await axios({
      method: 'put',
      url: `/todo/${id}`,
      data: { isCompleted: !complete },
    });

    setComplete(!complete);
    console.log(complete);
  };

  //UPDATE TITLE
  const UpdateTitle = async (id) => {
    const response = await axios({
      method: 'put',
      url: `/todo/${id}`,
      data: { title: editInput },
    });
    setTitle(editInput);
    console.log(title);
  };

  //DELETE MY TODO
  const DeleteTodo = async (e) => {
    try {
      const response = await axios({
        method: 'delete',
        url: `/todo/${props.myUserId}`,
        data: { _id: e.target.id },
      });

      await props.setMyTodos(
        props.myTodos.filter((item) => item._id !== e.target.id)
      );
      console.log(e.target.id);
    } catch (err) {
      console.log(err);
    }
    console.log(props.myTodos);
  };

  return (
    <div className="todo-item" key={props.item._id}>
      <div
        className={complete ? 'completed-circle' : 'uncompleted-circle'}
        onClick={(e) => {
          setComplete(!complete);
          //console.log(props.item);
          UpdateComplete(props.item._id);
        }}
      ></div>
      <p>{title}</p>

      <div className="edit-del-section">
        <button
          className="edit-todo"
          onClick={(e) => {
            setEditScreen(!editScreen);
          }}
        />
        {editScreen && (
          <div className="edit-screen">
            <button
              className="close-window"
              onClick={(e) => {
                setEditScreen(!editScreen);
              }}
            ></button>
            <div>
              <input
                placeholder={props.item.title}
                onChange={(e) => {
                  e.preventDefault();
                  setEditInput(e.target.value);
                }}
              ></input>
              <button
                className="edit-button"
                onClick={() => {
                  setEditScreen(false);
                  UpdateTitle(props.item._id);
                  setTitle(editInput);
                }}
              >
                Edit
              </button>
            </div>
          </div>
        )}
        <button
          className="delete-todo"
          id={props.item._id}
          onClick={(e) => DeleteTodo(e)}
        ></button>
      </div>
    </div>
  );
};
