import 'react-toolbox/lib/commons.scss';
import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import promise from 'redux-promise';
import createLogger from 'redux-logger';

import reducers from './main/reducers/index';

const logger = createLogger();
const middleware = applyMiddleware(thunk, promise, logger);
const store = createStore(reducers); //, middleware);



import App from './main/App'

import { Router, Route, IndexRoute, hashHistory } from 'react-router';

import { createHistory } from 'history';

/*
<Router history={hashHistory}>
    <Route path="/" component={App}>
        <IndexRoute component={DashboardContent}></IndexRoute>
        <Route path="createad" component={CreateAd}></Route>
    </Route>
</Router>
*/

let view = (
    <Provider store={store}>
        <App/>
    </Provider>
);


ReactDOM.render(view, document.getElementById('app'));
