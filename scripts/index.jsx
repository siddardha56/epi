"use strict";

import '../styles/main.scss';

//React
import React from 'react';
import { render } from 'react-dom';

//Redux
import { applyMiddleware, compose, createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';

//Router
import { Router, Route, IndexRoute } from 'react-router'
import {
    syncHistory, routeReducer
} from 'redux-simple-router';
import { createHistory } from 'history'
//Dev tools
import { createDevTools } from 'redux-devtools';
import LogMonitor from 'redux-devtools-log-monitor';
import DockMonitor from 'redux-devtools-dock-monitor';

//Mui
import injectTapEventPlugin from 'react-tap-event-plugin';

import {rootReducer} from './reducers/rootReducer';

//components
import App from './containers/App.jsx';
import Movies from './containers/pages/Movies.jsx';
import TV from './containers/pages/TV.jsx';
import PageNotFound from './containers/pages/PageNotFound.jsx';

const history = createHistory();
const middleware = syncHistory(history);
const reducer = combineReducers(Object.assign({}, {data: rootReducer}, {
    routing: routeReducer
}));

const DevTools = createDevTools(
    <DockMonitor toggleVisibilityKey='ctrl-h'
                 changePositionKey='ctrl-q'>
        <LogMonitor theme='tomorrow'/>
    </DockMonitor>
);

const finalCreateStore = compose(
    applyMiddleware(middleware, thunkMiddleware),
    DevTools.instrument()
)(createStore);

const store = finalCreateStore(reducer);
middleware.listenForReplays(store);

injectTapEventPlugin();

const rootElement = document.getElementById('root');

render(
    <div>
        <Provider store={store}>
            <div>
                <Router history={history}>
                    <Route path="/" component={App}>
                        <IndexRoute component={Movies}/>
                        <Route path="movies" component={Movies}/>
                        <Route path="tv" component={TV}/>
                    </Route>
                    <Route path="*" component={PageNotFound}/>
                </Router>
            <DevTools/>
            </div>
        </Provider>
    </div>,
    rootElement
);