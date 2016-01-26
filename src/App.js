'use strict';

import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from './store';

import Login from './components/Login';

export class App extends Component {
  render() {
    return (
      <Provider store={ store } >
      <Login/>
      < /Provider>
    );
  }
}
