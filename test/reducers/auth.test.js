"use strict";

const expect = require("unexpected");
const reducer = require("../../src/reducers/auth.js");
const freeze = require("deep-freeze");

describe("auth reducer", () => {
  it("should return the initial state", () => {
    expect(reducer(undefined, {}), "to equal", {
      auth_token: null,
      username: null,
      loginPending: false,
      error: null
    });
  });

  it("should handle PROCESSING_LOGIN", () => {
    const initialState = {
        auth_token: null,
        username: null,
        loginPending: false,
        error: null
    };

    freeze(initialState);

    expect(reducer(initialState, { type: "PROCESSING_LOGIN" }), "to equal", {
      auth_token: null,
      username: null,
      loginPending: true,
      error: null
    });
  });

  it("should handle LOGIN_FAILED", () => {
    const initialState = {
        auth_token: null,
        username: null,
        loginPending: true,
        error: null
    };

    freeze(initialState);

    expect(reducer(initialState, { type: "LOGIN_FAILED", error: new Error("request failed") }), "to equal", {
      auth_token: null,
      username: null,
      loginPending: false,
      error: new Error("request failed")
    });
  });

  it("should handle LOGIN_SUCCESSFUL", () => {
    const initialState = {
        auth_token: null,
        username: null,
        loginPending: true,
        error: null
    };

    const action = {
      type: "LOGIN_SUCCESSFUL",
      user: {
        username: "test",
        auth_token: "damn-auth-code"
      }
    }

    freeze(initialState);

    expect(reducer(initialState, action), "to equal", {
      auth_token: "damn-auth-code",
      username: "test",
      loginPending: false,
      error: null
    });
  });

  it("should handle LOGOUT", () => {
    const initialState = {
      auth_token: "damn-auth-code",
      username: "test",
      loginPending: false,
      error: null
    }

    freeze(initialState);

    expect(reducer(initialState, { type: "LOGOUT" }), "to equal", {
      auth_token: null,
      username: null,
      loginPending: false,
      error: null
    });
  });
});