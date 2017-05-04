


"use strict"

export const showModalAddForm = (show) => {
    return {
        type: 'ACTION_SHOW_ADD_FORM',
        payload: show
    };
}


export const actionHandlePaginationChange = (page) => {
    return {
        type: 'ACTION_SHOW_HANDLE_PAGINATION_CHANGE',
        payload: page
    }
}

export const actionHandleSelectedItem = (item) => {
    return {
        type: 'ACTION_HANDLE_SELECTED_ITEM',
        payload: item
    }
}

export const actionOnChangeItems = (items) => {
    return {
        type: 'ACTION_HANDLE_REFRESH_ITEMS',
        payload: items
    };
}