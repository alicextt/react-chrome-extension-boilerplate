import React from 'react';
import ReactDOM from 'react-dom';
import Root from '../../app/containers/Root';
import './todoapp.css';
import axios from 'axios';

chrome.cookies.getAll({domain: '.godaddy.com', name:'auth_idp'}, function(cookies) {
    var cookie = cookies[0].value;
    var accounts = [];
    axios.get("https://instantpage.api.godaddy.com/v2/websites", {
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
              <Root store={createStore(initialState)} />,
              document.querySelector('#root')
            );
          });
    });
});
