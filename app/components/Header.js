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
    const act= this.props.active;
    return (
      <header>
        <div className={style.tab}>
          <button className={ act ==='accounts' ? style.active: null} onClick={ this.handleChange.bind(null, 'accounts')}>Swtich Accounts</button>
          <button className={ act ==='search' ? style.active: null} onClick={ this.handleChange.bind(null, 'search')}>Search</button>
        </div>
      </header>
    );
  }
}
