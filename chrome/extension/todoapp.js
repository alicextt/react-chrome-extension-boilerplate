import React from 'react';
import ReactDOM from 'react-dom';
import Root from '../../app/containers/Root';
import './todoapp.css';
import axios from 'axios';

chrome.tabs.query({ active: true, currentWindow: true}, function(tabs) {
  var tab = tabs[0];
  console.log(tab.url)
  if(tab.url.includes('test')){
    renderFunc('.test-godaddy.com');
  } else {
    renderFunc('.godaddy.com');
  }
});

const renderFunc = (domain) => {
  chrome.cookies.getAll({domain: domain, name:'auth_idp'}, function(cookies) {
    var cookie = cookies[0].value;
    var accounts = [];

    axios.get(`https://instantpage.api${domain}/v2/websites`, {
      headers: {
        Cookie: `auth_idp=${cookie}`
      }
    }).then((res) => {
      const data = res.data;
      for(var i =0; i<data.length; i++){
        if(data[i].properties.businessName)
        accounts.push({id: data[i].id, name: data[i].properties.businessName});
      }
      console.log(accounts);
      // state { accounts: [], [], []}
      chrome.storage.local.get('state', (obj) => {
        const { state } = obj;
        const initialState = JSON.parse(state || '{}');
        initialState.accounts = accounts;
        const createStore = require('../../app/store/configureStore');

        ReactDOM.render(
          <Root store={createStore(initialState)} domain={domain} />,
          document.querySelector('#root')
        );
      });
    });
  });
}
