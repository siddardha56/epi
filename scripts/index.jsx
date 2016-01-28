"use strict";

import '../styles/main.scss';

//React
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute } from 'react-router'

//Mui
import injectTapEventPlugin from 'react-tap-event-plugin';

//components
import App from './containers/App.jsx';
import Movies from './containers/pages/Movies.jsx';
import TV from './containers/pages/TV.jsx';
import PageNotFound from './containers/pages/PageNotFound.jsx';

import {DevTools} from './DevTools.js';
import {store} from './createStore';
import {history} from './createStore';

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