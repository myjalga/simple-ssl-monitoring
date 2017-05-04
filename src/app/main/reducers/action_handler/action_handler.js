

"use strict"


export const actionHandler = [];

actionHandler['ACTION_SHOW_ADD_FORM'] = (state, payload) => {
    state = {
        ...state,
        showAddForm: payload
    }
    return state;
}

actionHandler['ACTION_SHOW_HANDLE_PAGINATION_CHANGE'] = (state, payload) => {
    state = {
        ...state,
        activePage: payload
    }
    return state;
}

actionHandler['ACTION_HANDLE_SELECTED_ITEM'] = (state, payload) => {
    state = {
        ...state,
        selected: payload
    }
    return state
}

actionHandler['ACTION_HANDLE_REFRESH_ITEMS'] = (state, payload) => {
    state = {
        ...state,
        source: payload
    }
    return state;
}
