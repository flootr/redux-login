'use strict';

import fetch from 'isomorphic-fetch';

function prepareFetch(user) {
  return {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username: user.username,
      password: user.password,
    }),
  };
}

export function login(user) {
  return {
    types: ['PROCESSING_LOGIN', 'LOGIN_SUCCESSFUL', 'LOGIN_FAILED'],
    callApi: () => fetch('/login', prepareFetch(user)).then((res) => res.json()),
  };
}

export const logout = () => ({
  type: 'LOGOUT',
});
