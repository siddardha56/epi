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
import thunkMiddleware from 'redux-thunk';


//import reducers from './reducers';
import {rootReducer} from './reducers/rootReducer';

import App from './containers/App';
import Movies from './containers/pages/Movies';
import TV from './containers/pages/TV';
import PageNotFound from './containers/pages/PageNotFound';

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

//required for material-ui to work with react
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

            </div>
        </Provider>
    </div>,
    rootElement
);