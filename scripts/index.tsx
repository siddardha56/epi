/// <reference path="../typings/tsd.d.ts" />

"use strict";

import '../styles/main.scss';

//React
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute } from 'react-router'

//components
import App from './containers/App.tsx';
import Movies from './containers/pages/Movies.tsx';
import MovieDetail from './containers/pages/MovieDetail.tsx';
import TV from './containers/pages/TV.tsx';
import PageNotFound from './containers/pages/PageNotFound.tsx';

import {DevTools} from './DevTools.tsx';
import {store} from './createStore.ts';
import {history} from './createStore.ts';

const rootElement = document.getElementById('root');

render(
    <div>
        <Provider store={store}>
                <Router history={history}>
                    <Route path="/" component={App}>
                        <IndexRoute component={Movies}/>
                        <Route path="movies" component={Movies}/>
                        <Route path="/movie/:id" component={MovieDetail}/>
                        <Route path="tv" component={TV}/>
                    </Route>
                    <Route path="*" component={PageNotFound}/>
                </Router>
                {/*<DevTools/>*/}
        </Provider>
    </div>,
    rootElement
);