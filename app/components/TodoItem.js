import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import TodoTextInput from './TodoTextInput';
import style from './TodoItem.css';

export default class TodoItem extends Component {

  static propTypes = {
    account: PropTypes.object.isRequired,
    editTodo: PropTypes.func.isRequired,
    deleteTodo: PropTypes.func.isRequired,
    completeTodo: PropTypes.func.isRequired
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      editing: false
    };
  }

  handleDoubleClick = () => {
    this.setState({ editing: true });
  };

  handleSave = (text) => {
    const { todo, deleteTodo, editTodo } = this.props;
    if (text.length === 0) {
      deleteTodo(todo.id);
    } else {
      editTodo(todo.id, text);
    }
    this.setState({ editing: false });
  };

  handleComplete = () => {
    const { todo, completeTodo } = this.props;
    completeTodo(todo.id);
  };

  handleDelete = () => {
    const { todo, deleteTodo } = this.props;
    deleteTodo(todo.id);
  };

  openTab = (id) => {
    chrome.tabs.create({active: true, url: `https://instantpage.godaddy.com/en-US/editor/${id}`});
  }

  render() {
    const { account } = this.props;

    let element;
    if (this.state.editing) {
      element = (
        <TodoTextInput
          text={todo.text}
          editing={this.state.editing}
          onSave={this.handleSave}
        />
      );
    } else {
      element = (
        <div className={style.view}>
          <label>
            {account.name}
          </label>
          <a onClick={ this.openTab.bind(null, account.id) } className={style.button}>Launch</a>
        </div>
      );
    }

    return (
      <li
        className={classnames({
          [style.normal]: !this.state.editing
        })}
      >
        {element}
      </li>
    );
  }
}
