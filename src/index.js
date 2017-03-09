import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Login from './routes/login/Login';
import {
  Router,
  DefaultRoute,
  Route,
  hashHistory
}
from 'react-router';
import auth from './AuthService';

import axios from 'axios';


axios.interceptors.request.use(function(request) {
  if (auth.loggedIn()) {
    request.headers.Authorization = 'JWT ' + auth.getToken();
  }

  return request;
}, function(error) {
  return Promise.reject(error);
});

axios.interceptors.response.use(function(response) {
  if (response.statusCode === 401) {
    hashHistory.push('/login');
  }

  return response;
}, function(error) {
  return Promise.reject(error);
});

function gatekeeper(nextState, replace) {
  if (!auth.loggedIn()) {
    replace({
      pathname: '/login'
    })
  }
}
ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/login" component={Login}></Route>
    <Route path="/" component={App} onEnter={gatekeeper}></Route>
  </Router>,
  document.getElementById('root')
);
