'use strict';

import fetch from 'isomorphic-fetch';

export const processLogin = () => ({
  type: 'PROCESSING_LOGIN',
});

export const loginFailed = (error) => ({
  type: 'LOGIN_FAILED',
  error,
});

export const loginSuccessful = (user) => ({
  type: 'LOGIN_SUCCESSFUL',
  user,
});

export const login = (user) => (dispatch) => {
  dispatch(processLogin());

  fetch('/login', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username: user.username,
      password: user.password,
    }),
  })
  .then((res) => res.json())
  .then((res) => {
    if (res.status === 'success') {
      dispatch(loginSuccessful(res.user));
      return;
    }

    dispatch(loginFailed(res.message));
  })
  .catch((err) => {
    dispatch(loginFailed(err));
  });
};

export const logout = () => ({
  type: 'LOGOUT',
});
