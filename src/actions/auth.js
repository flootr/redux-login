"use strict";

function processLogin() {
    return {
        type: "PROCESSING_LOGIN"
    }
}

function loginFailed(error) {
    return {
        type: "LOGIN_FAILED",
        error
    }
}

function loginSuccessful(user) {
    return {
        type: "LOGIN_SUCCESSFUL",
        user
    }
}

export function login(user) {
    return (dispatch) => {
        dispatch(processLogin());

        fetch("/login", {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username: user.username,
                    password: user.password
                })
            })
            .then((res) => {
                return res.json();
            })
            .then((res) => {
                if (res.status === "success") {
                    dispatch(loginSuccessful(res.user));
                    return;
                }

                dispatch(loginFailed(res.message));
            })
            .catch((err) => {
                dispatch(loginFailed(error));
            });
    }
}

export function logout() {
    return {
        type: "LOGOUT"
    }
}
