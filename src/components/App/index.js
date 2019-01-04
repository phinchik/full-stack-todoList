import React, { Component } from "react";
import InputTodo from "../Input";
import List from "../List/list";
import { connect } from "react-redux";
import * as actions from "../../actions";
import styles from "./index.css";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      todoList: null
    };
  }

  componentDidMount() {
    this.props.getTodos();
  }

  updateTodoList = newTodoList => {
    this.setState({
      todoList: newTodoList
    });
  };

  deleteAll = () => {
    let completedTodos =
      this.props.todos &&
      this.props.todos.filter(todos => {
        if (todos.completed === true) {
          return todos;
        }
      });

    this.props.deleteAll(completedTodos);
  };

  render() {
    return (
      <div className={styles.appContainer}>
        <div className={styles.todoContainer}>
          <h1 className={styles.header}>TODOS</h1>
          <InputTodo />
          <List />
          <div className={styles.deleteContainer}>
            <span className={styles.todoCount}>
              {`Todos Count : ${this.props.todos.length}`}
            </span>
            <button
              className={styles.deleteAll}
              onClick={() => this.deleteAll()}
            >
              DELETE ALL
            </button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    todos: state.todolist.todos
  };
};

const mapDispatchToProps = {
  getTodos: actions.getTodos,
  deleteAll: actions.deleteAll
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
