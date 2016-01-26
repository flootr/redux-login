'use strict';

import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import { apiCall } from './middleware/apiCall';

const middleware = process.env.NODE_ENV === 'production' ?
    [thunk, apiCall] :
    [thunk, apiCall, logger()];

const createStoreWithMiddleware = applyMiddleware(...middleware)(createStore);
const store = createStoreWithMiddleware(rootReducer);

export default store;
