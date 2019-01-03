import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions";
import styles from "./index.css";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";

class InputTodo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputVal: ""
    };
  }

  render() {
    return (
      <div className={styles.inputContainer}>
        <input
          value={this.state.inputVal}
          onChange={this.onInputChange}
          autoFocus
          className={styles.input}
          placeholder="What needs to be done? "
          onKeyPress={e => this.addTodo(e)}
        />
      </div>
    );
  }

  onInputChange = e => {
    this.setState({ inputVal: e.target.value });
  };

  addTodo = e => {
    if (e.key == "Enter") {
      this.props.addTodo(this.state.inputVal);
      this.setState({ inputVal: "" });
    }
  };
}

const mapStateToProps = state => {
  return {
    todos: state.todolist.todos,
    loading: state.todolist.loading,
    error: state.todolist.error
  };
};

const mapDispatchToProps = {
  addTodo: actions.addTodo
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(InputTodo));
