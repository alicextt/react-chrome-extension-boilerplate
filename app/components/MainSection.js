import React, { Component, PropTypes } from 'react';
import TodoItem from './TodoItem';
import Footer from './Footer';
import { SHOW_ALL, SHOW_COMPLETED, SHOW_ACTIVE } from '../constants/TodoFilters';
import style from './MainSection.css';
import sendMessage from '../utils/util';
import scoreFunc from '../utils/score';
import classnames from 'classnames';

const dict = {
  'Change Fonts': ['EDITOR_HEADER_EDIT_BUTTON', 'MYSITE_PIVOT_THEME', 'EDIT_FIELD_FONTS_SEGMENTED_CONTROL'],
  'Reset Website': ['EDITOR_HEADER_EDIT_BUTTON', 'MYSITE_PIVOT_SETTINGS', 'EDIT_FIELD_BACKUP_RESTORE'],
  'Add Page': ['EDITOR_HEADER_EDIT_BUTTON', 'MYSITE_PIVOT_PAGES'],
  'Change Color': ['EDITOR_HEADER_EDIT_BUTTON', 'MYSITE_PIVOT_THEME'],
  'Add Section': ['EDITOR_HEADER_EDIT_BUTTON', 'ADD_WIDGET_PLUS_ICON'],
  'Add Widget': ['EDITOR_HEADER_EDIT_BUTTON', 'ADD_WIDGET_PLUS_ICON'],
  'Delete Page': ['EDITOR_HEADER_EDIT_BUTTON', 'MYSITE_PIVOT_PAGES'],
  'Change Page Name': ['EDITOR_HEADER_EDIT_BUTTON','MYSITE_PIVOT_PAGES'],
  'Add HTML': ['EDITOR_HEADER_EDIT_BUTTON', 'ADD_WIDGET_PLUS_ICON'],
  'Google Analytics': ['EDITOR_HEADER_EDIT_BUTTON', 'MYSITE_PIVOT_SETTINGS', 'EDIT_FIELD_GOOGLE_AN'],
  'Google Translate': ['EDITOR_HEADER_EDIT_BUTTON', 'MYSITE_PIVOT_SETTINGS','EDIT_FIELD_GOOGLE_TRANSLATE'],
  'Change Business Name': ['EDITOR_HEADER_EDIT_BUTTON','MYSITE_PIVOT_SETTINGS', 'EDIT_FIELD_BUSINESS_PROFILE']
}

const dictKey = Object.keys(dict);

export default class MainSection extends Component {

  static propTypes = {
    todos: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
  };

  constructor(props, context) {
    super(props, context);
    this.state = { input: '', selectedId: this.props.websiteId, searchId: 0, listLength: 0 };
  }

  componentWillMount () {
   document.addEventListener("keydown", this._handleKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this._handleKeyDown);
  }

  componentWillReceiveProps(props){
    if(this.props.active === 'accounts' && props.active === 'search'){
      this.setState({searchId: 0});
    }
  }

  _handleKeyDown= (event) => {
    const { active } = this.props;
    const {selectedId, searchId} = this.state;
    switch( event.keyCode ) {
        case 13:
          if(active === 'accounts'){
            this.refs[selectedId].openTab(selectedId);
          }else{
            this.refs[searchId].click();
          }
            break;
        case 40: // down arrow
        console.log(this.list)
          if(active === 'accounts'){
            const next = this.findId(true, selectedId);
            this.setState({selectedId: next.id});
          }else {
            this.setState({searchId: searchId +1});
          }
            break;
      case 38: // up arrow
      if(active === 'accounts'){
          const prev = this.findId(false, selectedId);
          this.setState({selectedId: prev.id});
        } else {
          this.setState({searchId: (searchId >1 ? searchId-1 : 0)});
        }
          break;
        case 37: // left arrow
            if(this.props.active==='search'){
              this.props.changeTab('accounts');
            }
            break;
        case 39: // right arrow
            if(this.props.active==='accounts'){
              this.props.changeTab('search');
            }
            break;
        default:
            break;
    }
  }

  findId = (next, id) => {
    // next means go to next accountId
    const accounts = this.props.accounts;
    for(var i=0; i<accounts.length; i++){
      if(next && accounts[i].id === id){
        return i === accounts.length-1? accounts[i] : accounts[i+1];
      }else if(!next && accounts[i].id === id){
        return i === 0 ? accounts[i] : accounts[i-1];
      }
    }
  }

  sendAction = (key) => {
    sendMessage(dict[key]);
  }

  handleChange = (e) => {
    if(!e.target.value){
      this.setState({searchId: 0});
    }
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
    var res = [];
    var scores = [];
    if(input === '*'){
      let i = 0;
      dictKey.sort().map((word) => {
          res.push(<div className={classnames({ [style.button]: true, [style.select]:  this.state.searchId === i})} key={i} onClick={ this.sendAction.bind(null, word) } ref={i}> {word} <div className={style.inside}> Show Me How</div></div>);
          i++;
      });
      this.list = i;
    } else {
      let i = 0;
      scores = dictKey.map((v) => {
        return [scoreFunc(v, input|| '', 0), v];
      }) || [];
      scores.sort(function(a, b){ return a[0]-b[0] }).map((props) => {
        if(props[0]>=0.3){
          const word = props[1];
          res.push(<div className={classnames({ [style.button]: true, [style.select]:  this.state.searchId === i})} key={i} onClick={ this.sendAction.bind(null, word) } ref={i}> {word} <div className={style.inside}> Show Me How</div></div>);
          i++;
        }
      });
      this.list = i;
    }

    return (
      <div>{res}</div>
    );
  }

  render() {
    const { todos, actions, accounts, active, domain, websiteId } = this.props;
    const {input, selectedId} = this.state;

    if(active === 'accounts'){
      return (
        <section className={style.main}>
        <ul className={style.todoList}>
        {accounts.map(account =>
          <TodoItem key={account.id} account={account} domain={domain} {...actions} selected={selectedId ===account.id} ref={account.id}/>
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
        <input type="text" placeholder="Try add ...." onChange={ this.handleChange }  ref={input => input && input.focus()} />
      </div>
        { input === '*' ||
        <div className={style.align}>Type * to see the full list</div>
        }
      <div>
      { this.renderSearch()}
      </div>
        { this.renderFooter(4)}
      </section>
    )
  }
}
