"use strict";

import { combineReducers } from "redux";

function auth_token(state = null, action) {
    switch (action.type) {
        case "LOGIN_SUCCESSFUL":
            return action.user.auth_token;
        case "LOGOUT":
            return null;
        default:
            return state;
    }
}

function username(state = null, action) {
    switch (action.type) {
        case "LOGIN_SUCCESSFUL":
            return action.user.username;
        case "LOGOUT":
            return null;
        default:
            return state;
    }
}

function loginPending(state = false, action) {
    switch (action.type) {
        case "PROCESSING_LOGIN":
            return true;
        case "LOGIN_FAILED":
            return false;
        case "LOGIN_SUCCESSFUL":
            return false;
        default:
            return state;
    }
}

function error(state = null, action) {
    switch (action.type) {
        case "LOGIN_FAILED":
            return action.error;
        default:
            return state;
    }
}

export default combineReducers({
    auth_token,
    loginPending,
    username,
    error
});