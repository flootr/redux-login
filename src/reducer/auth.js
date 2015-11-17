"use strict";

function getInitialState() {
    return {
        auth_token: null,
        username: null,
        loginPending: false,
        error: null
    }
}

function authReducer(state = getInitialState(), action) {
    switch (action.type) {
        case "PROCESSING_LOGIN":
            return Object.assign({}, state, {
                loginPending: true
            });
        case "LOGIN_FAILED":
            return Object.assign({}, state, {
                loginPending: false,
                error: action.error
            });
        case "LOGIN_SUCCESSFUL":
            return Object.assign({}, state, {
                loginPending: false,
                username: action.user.username,
                auth_token: action.user.auth_token
            });
        case "LOGOUT":
            return getInitialState();
        default:
            return state;
    }
}

export default authReducer;
