"use strict";
/// <reference path="../typings/react/react.d.ts" />
/// <reference path="../typings/react/react-dom.d.ts" />
/// <reference path="../typings/react-redux/react-redux.d.ts" />
/// <reference path="../typings/material-ui/material-ui.d.ts" />

import '../styles/main.scss';

//React
import * as React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute } from 'react-router'

//Mui
import injectTapEventPlugin from 'react-tap-event-plugin';

//components
import App from './containers/App.tsx';
import Movies from './containers/pages/Movies.tsx';
import MovieDetail from './containers/pages/MovieDetail.tsx';
import TV from './containers/pages/TV.tsx';
import PageNotFound from './containers/pages/PageNotFound.tsx';

import {DevTools} from './DevTools.tsx';
import {store, history} from './createStore.ts';

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
                        <Route path="/movie/:id" component={MovieDetail}/>
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