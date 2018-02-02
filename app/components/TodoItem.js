import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import style from './TodoItem.css';

export default class TodoItem extends Component {

  static propTypes = {
    account: PropTypes.object.isRequired,
  };

  constructor(props, context) {
    super(props, context);
  }

  openTab = (id) => {
    chrome.tabs.create({active: true, url: `https://instantpage${this.props.domain}/en-US/editor/${id}`});
  }

  render() {
    const { account, selected } = this.props;

    let element;
      element = (
        <div className={classnames({ [style.view]: true, [style.select]: selected })}>
          <label>
            {account.name}
          </label>
          <a onClick={ this.openTab.bind(null, account.id) } className={style.button}>Launch</a>
        </div>
      );


    return (
      <li
        className={classnames({
          [style.normal]: true
        })}
      >
        {element}
      </li>
    );
  }
}
