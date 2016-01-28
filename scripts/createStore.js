//Redux
import { applyMiddleware, compose, createStore, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';

//Router
import {
    syncHistory, routeReducer
} from 'redux-simple-router';
import { createHistory } from 'history'
import {rootReducer} from './reducers/rootReducer';
import {DevTools} from './DevTools.js';


export const history = createHistory();

const middleware = syncHistory(history);
const reducer = combineReducers(Object.assign({}, {data: rootReducer}, {
    routing: routeReducer
}));

const finalCreateStore = compose(
    applyMiddleware(middleware, thunkMiddleware),
    DevTools.instrument()
)(createStore);

export const store = finalCreateStore(reducer);
middleware.listenForReplays(store);