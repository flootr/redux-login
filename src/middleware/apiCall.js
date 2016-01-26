'use strict';

/* eslint-disable complexity */

export function apiCall({ dispatch }) {
  return (next) => (action) => {
    const { types, callApi } = action;

    if (!types) {
      return next(action); // pass it on, normal action
    }

    if (!Array.isArray(types)
        || types.length !== 3
        || !types.every((type) => typeof type === 'string')
      ) {
      throw new Error('Expected an array of three string types');
    }

    if (typeof callApi !== 'function') {
      throw new Error('Expected fetch to be a function');
    }

    const [requestType, successType, failureType] = types;

    // start request
    dispatch({ type: requestType });

    return callApi()
      .then((res) => {
        console.log(res);

        if (res.status === 'success') {
          dispatch({ type: successType, payload: res });
        }

        dispatch({ type: failureType, payload: 'bad credentials' });
      })
      .catch((error) => {
        dispatch({ type: failureType, payload: error.message, error: true });
      });
  };
}
