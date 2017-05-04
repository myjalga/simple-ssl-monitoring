

"use strict"

import { combineReducers } from 'redux';

import manager from './manager';

const reducers = combineReducers({
    manager: manager
});

export default reducers;