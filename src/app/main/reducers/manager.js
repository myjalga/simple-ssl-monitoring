

"use strict"

let _manager = {
    showAddForm: false,
    source: [],
    selected: [],
    activePage: 1
}

import { actionHandler } from './action_handler/action_handler'



export default (state=_manager, action) => {
    let fn = actionHandler[action.type];
    if ( fn ) {
        state = fn(state, action.payload);
    }
    return state;
}