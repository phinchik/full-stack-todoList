import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions";
import styles from "./index.css";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      edit: false,
      id: null,
      inputChange: null,
      checkedTodos: []
    };
  }

  onToggleChange(id, completed) {
    this.props.toggleTodo(id, completed);
  }

  render() {
    if (this.props.loading) {
      return <p>Loading...</p>;
    } else if (this.props.error) {
      console.log("ERROR!!!!!");
      return <p>There was an error!</p>;
    }

    const getValue = text => {
      if (this.state.inputChange) {
        return this.state.inputChange;
      } else if (this.state.inputChange === "") {
        return "";
      }
      return text;
    };

    return (
      <ul className={styles.ul}>
        {this.props.todos &&
          this.props.todos.map(todoItem => {
            return this.state.edit && this.state.id === todoItem._id ? (
              <li key={todoItem._id} className={styles.item}>
                <input
                  className={styles.updateInput}
                  value={getValue(todoItem.text)}
                  onChange={e => this.setState({ inputChange: e.target.value })}
                />
                <IconButton
                  className={styles.cancelUpdateButton}
                  onClick={() =>
                    this.setState({
                      edit: !this.state.edit,
                      id: todoItem._id
                    })
                  }
                >
                  <Typography className={styles.cancelText}>X</Typography>
                </IconButton>
                <Button
                  className={styles.updateButton}
                  variant="outlined"
                  color="primary"
                  onClick={() =>
                    this.updateTodo(
                      todoItem._id,
                      this.state.inputChange,
                      todoItem.completed
                    )
                  }
                >
                  Update
                </Button>
              </li>
            ) : (
              <li key={todoItem._id} className={styles.item}>
                <input
                  className={styles.input}
                  checked={todoItem.completed}
                  type="checkbox"
                  onChange={() =>
                    this.onToggleChange(todoItem._id, todoItem.completed)
                  }
                />

                <span
                  onDoubleClick={() => {
                    this.setState({ edit: true, id: todoItem._id });
                  }}
                  className={styles.textContainer}
                  style={{
                    textDecoration: todoItem.completed && "line-through"
                  }}
                >
                  <p className={styles.text}>{todoItem.text}</p>
                </span>

                <IconButton onClick={() => this.deleteTodo(todoItem._id)}>
                  <DeleteIcon />
                </IconButton>
              </li>
            );
          })}
      </ul>
    );
  }

  deleteTodo = id => {
    this.props.deleteTodo(id);
  };

  updateTodo = (id, input, completed) => {
    this.props.updateTodo(id, input, completed);
    this.setState({ edit: !this.state.edit });
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
  deleteTodo: actions.deleteTodo,
  updateTodo: actions.updateTodo,
  toggleTodo: actions.toggleTodo
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(List));
