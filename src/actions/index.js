import {
  DELETE_TODO,
  FETCH_TODOS,
  FETCH_TODOS_SUCCESS,
  FETCH_TODOS_FAIL,
  ADD_TODO,
  UPDATE_TODO,
  TOGGLE_TODO,
  DELETE_ALL
} from "./types";

const URL = "http://localhost:5000";

export const getTodos = () => {
  return dispatch => {
    dispatch({ type: FETCH_TODOS });

    fetch(`${URL}/todo`, {
      method: "GET"
    })
      .then(response => {
        return response.json();
      })
      .then(todos => {
        dispatch({ type: FETCH_TODOS_SUCCESS, payload: todos });
      })
      .catch(error => {
        dispatch({ type: FETCH_TODOS_FAIL });
      });
  };
};

export const deleteTodo = id => {
  return dispatch => {
    fetch(`${URL}/todo`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      method: "DELETE",
      body: JSON.stringify({ value: id })
    })
      .then(response => {
        return response.json();
      })
      .then(todoId => {
        console.log("todoId >>>>", todoId);
        dispatch({ type: DELETE_TODO, payload: todoId });
      });
  };
};

export const addTodo = inputVal => {
  return dispatch => {
    fetch(`${URL}/todo`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      method: "POST",
      body: JSON.stringify({ value: inputVal })
    })
      .then(response => {
        return response.json();
      })
      .then(todos => {
        dispatch({ type: ADD_TODO, payload: todos });
      });
  };
};

export const updateTodo = (e, id, input, completed) => {
  return dispatch => {
    fetch(`${URL}/todo`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      method: "PUT",
      body: JSON.stringify({ id, value: input, completed })
    })
      .then(response => {
        return response.json();
      })
      .then(todo => {
        dispatch({ type: UPDATE_TODO, payload: todo });
      });
  };
};

export const toggleTodo = (id, completed) => {
  return dispatch => {
    fetch(`${URL}/todo`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      method: "PUT",
      body: JSON.stringify({ id, completed })
    })
      .then(response => {
        return response.json();
      })
      .then(todo => {
        dispatch({ type: TOGGLE_TODO, payload: todo });
      });
  };
};

export const deleteAll = completedTodos => {
  return dispatch => {
    fetch(`${URL}/todo`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      method: "DELETE",
      body: JSON.stringify({ completedTodos })
    })
      .then(response => {
        return response.json();
      })
      .then(() => {
        dispatch({ type: DELETE_ALL, payload: completedTodos });
      });
  };
};
