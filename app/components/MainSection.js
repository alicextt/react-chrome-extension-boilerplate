import React, { Component, PropTypes } from 'react';
import TodoItem from './TodoItem';
import Footer from './Footer';
import { SHOW_ALL, SHOW_COMPLETED, SHOW_ACTIVE } from '../constants/TodoFilters';
import style from './MainSection.css';
import sendMessage from '../utils/util';
import scoreFunc from '../utils/score';

const dict = {
  'Change Fonts': ['EDITOR_HEADER_EDIT_BUTTON', 'MYSITE_PIVOT_THEME', 'EDIT_FIELD_FONTS_SEGMENTED_CONTROL'],
  'Reset Website': [],
  'Add Page': [],
  'Change Color': [],
  'Add Section': [],
  'Section Reorder': []
}

const dictKey = Object.keys(dict);

export default class MainSection extends Component {

  static propTypes = {
    todos: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
  };

  constructor(props, context) {
    super(props, context);
    this.state = { input: '' };
  }

  sendAction = (key) => {
    sendMessage(dict[key]);
  }

  handleChange = (e) => {
    this.setState({ input : e.target.value});
  }

  renderFooter(completedCount) {
    const { todos } = this.props;
    const { filter } = this.state;
    const activeCount = todos.length - completedCount;

    if (todos.length) {
      return (
        <Footer
          completedCount={3}
          activeCount={4}
          filter='show_all'
          onClearCompleted={() => {}}
          onShow={() => {}}
        />
      );
    }
  }

  renderSearch() {
    const { input } = this.state;
    // console.log(dictKey);
    var filteredKey = dictKey.filter((v) => {
      // console.log(v);
      return scoreFunc(v, input|| '', 0)>=0.3;
    }) || [];

    var res = [];
    dictKey.sort().map((props) => {res.push(
       <a className={style.button} key={props} onClick={ this.sendAction.bind(null, props) }> {props}</a>
    );});
    return (
      <div>{res}</div>
    );
  }

  render() {
    const { todos, actions, accounts, active } = this.props;

    if(active === 'accounts'){
      return (
        <section className={style.main}>
        <ul className={style.todoList}>
        {accounts.map(account =>
          <TodoItem key={account.id} account={account} {...actions} />
        )}
        </ul>
        {this.renderFooter(4)}
        </section>
      );
    }

    return (
      <section className={style.main}>
      <div className={style.searchbox}>
        <svg className= { style.magnify} viewBox="0 0 48 48"><path d="M31 28h-1.59l-.55-.55C30.82 25.18 32 22.23 32 19c0-7.18-5.82-13-13-13S6 11.82 6 19s5.82 13 13 13c3.23 0 6.18-1.18 8.45-3.13l.55.55V31l10 9.98L40.98 38 31 28zm-12 0c-4.97 0-9-4.03-9-9s4.03-9 9-9 9 4.03 9 9-4.03 9-9 9z"/></svg>
        <input type="text" placeholder="Search here..." onChange={ this.handleChange }/>
      </div>
      <div>
      { this.renderSearch()}
      </div>
        { this.renderFooter(4)}
      </section>
    )
  }
}
