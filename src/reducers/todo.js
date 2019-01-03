import {
  FETCH_TODOS,
  FETCH_TODOS_SUCCESS,
  FETCH_TODOS_FAIL,
  DELETE_TODO,
  ADD_TODO,
  UPDATE_TODO,
  TOGGLE_TODO,
  DELETE_ALL
} from "../actions/types";

const initialState = {
  loading: false,
  todos: [],
  error: null,
  inputVal: "",
  editInput: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_TODOS:
      return {
        ...state,
        loading: true
      };
    case FETCH_TODOS_SUCCESS:
      return {
        ...state,
        todos: action.payload,
        loading: false
      };
    case FETCH_TODOS_FAIL:
      return {
        ...state,
        error: true,
        loading: false
      };
    case DELETE_TODO:
      const updatedTodos = state.todos.filter(
        todo => action.payload !== todo._id
      );
      return {
        ...state,
        todos: updatedTodos
      };
    case ADD_TODO:
      return {
        ...state,
        todos: action.payload
      };
    case UPDATE_TODO:
      const updatedTodo = state.todos.map(todo => {
        if (todo._id !== action.payload._id) {
          return todo;
        } else {
          return action.payload;
        }
      });
      return {
        ...state,
        todos: updatedTodo
      };
    case TOGGLE_TODO:
      const todosUpdated = state.todos.map(todo => {
        if (todo._id == action.payload._id) {
          todo.completed = action.payload.completed;
        }
        return todo;
      });
      return {
        ...state,
        todos: todosUpdated
      };
    case DELETE_ALL:
      const getDeletedTodos = action.payload.map(todo => {
        return todo._id;
      });

      const newTodos = state.todos.filter(todo => {
        const found = getDeletedTodos.find(deletedTodo => {
          if (deletedTodo === todo._id) {
            return todo;
          }
        });

        if (!found) {
          return todo;
        }
      });
      return {
        ...state,
        todos: newTodos
      };
    default:
      return state;
  }
};
