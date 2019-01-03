import { combineReducers } from "redux";
import todoReducer from "./todo";

const rootReducer = combineReducers({
  todolist: todoReducer
});

export default rootReducer;
