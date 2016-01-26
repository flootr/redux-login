'use strict';

/* eslint-disable react/prop-types */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { login, logout } from '../actions/auth';

class Login extends Component {
  constructor(props) {
    super(props);

    this._login = this._login.bind(this);
    this._logout = this._logout.bind(this);
  }

  _login(e) {
    e.preventDefault();

    const { dispatch } = this.props;

    dispatch(login({
      username: this.refs.username.value,
      password: this.refs.password.value,
    }));
  }

  _logout(e) {
    e.preventDefault();

    const { dispatch } = this.props;

    dispatch(logout());
  }

  render() {
    const { auth } = this.props;

    if (auth.username) {
      return (
        <div>
          <h1># Login</h1>
          <h2>Logged in as {auth.username}</h2>

          <button onClick={this._logout}>Logout</button>
        </div>
      );
    }

    return (
      <div>
        <h1># Login</h1>
        { auth.error ? auth.error : ''}
        <form onSubmit={this._login}>
            <p>
                <input type="text" name="username" ref="username"/>
            </p>
            <p>
                <input type="password" name="password" ref="password"/>
            </p>
            <button type="submit">Login</button>
        </form>
      </div>
    );
  }
}

function select(state) {
  return {
    auth: state.auth,
  };
}

export default connect(select)(Login);
