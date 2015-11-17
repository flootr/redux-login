"use strict";

import React from "react";
import { Provider } from "react-redux";
import store from "./store";

import Login from "./components/Login";

export const App = React.createClass({
    render () {
        return (
            <Provider store={store}>
                <Login/>
            </Provider>
        );
    }
});
