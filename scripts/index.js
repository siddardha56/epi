"use strict";

import '../styles/main.scss';

import { createDevTools } from 'redux-devtools';
import LogMonitor from 'redux-devtools-log-monitor';
import DockMonitor from 'redux-devtools-dock-monitor';

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, compose, createStore, combineReducers } from 'redux';
import { Router, Route, IndexRoute } from 'react-router'
import {
    syncHistory, routeReducer
} from 'redux-simple-router';

import injectTapEventPlugin from 'react-tap-event-plugin';
import createHistory from 'history/lib/createHashHistory';

//import reducers from './reducers';
import {rootReducer} from './reducers/rootReducer';

import App from './containers/App';
import Home from './containers/Home';

const history = createHistory();
const middleware = syncHistory(history);
const reducer = combineReducers(Object.assign({}, {data: rootReducer}, {
    routing: routeReducer
}));

const DevTools = createDevTools(
    <DockMonitor toggleVisibilityKey='ctrl-h'
                 changePositionKey='ctrl-q'>
        <LogMonitor theme='tomorrow' />
    </DockMonitor>
);

const finalCreateStore = compose(
    applyMiddleware(middleware),
    DevTools.instrument()
)(createStore);

const store = finalCreateStore(reducer);
middleware.listenForReplays(store);

//required for material-ui to work with react
injectTapEventPlugin();

const rootElement = document.getElementById('root');

render(
    <div>
        <Provider store={store}>
            <div>
                <Router history={history}>
                    <Route path="/" component={App}>
                        <IndexRoute component={Home}/>
                    </Route>
                </Router>

            </div>
        </Provider>
    </div>,
    rootElement
);