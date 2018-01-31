import React, { PropTypes, Component } from 'react';
import style from './Header.css';

export default class Header extends Component {

  static propTypes = {
    changeTab: PropTypes.func.isRequired
  };

  handleChange = (text) => {
    this.props.changeTab(text);
  };

  render() {
    return (
      <header>
        <div className={style.tab}>
          <button onClick={ this.handleChange.bind(null, 'accounts')}>Swtich Accounts</button>
          <button onClick={ this.handleChange.bind(null, 'search')}>Search</button>
        </div>
      </header>
    );
  }
}
