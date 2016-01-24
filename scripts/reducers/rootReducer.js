import * as actionTypes from '../constants/action-types';
import * as Immutable from 'immutable';

const initialState = Immutable.fromJS({
    movies: {
        latest: [],
        popular: {page: 0, total_pages: 0, total_results: 0, results: []},
        "now-playing": {page: 0, total_pages: 0, total_results: 0, results: []},
        "top-rated": {page: 0, total_pages: 0, total_results: 0, results: []},
        upcoming: {results: []},
        state: {
            isLoading: false
        }
    }
});

export function rootReducer(state = initialState, action) {
    console.log("root reducer", state, action.movies);


    switch (action.type) {

        case actionTypes.MOVIES_IS_LOADING:
            return state.setIn(['movies', 'state', 'isLoading'], action.isLoading);

        case actionTypes.SET_MOVIES_NOW_PLAYING:
        case actionTypes.SET_MOVIES_POPULAR:
        case actionTypes.SET_MOVIES_TOP_RATED:
        case actionTypes.SET_MOVIES_UPCOMING:
            return state.updateIn(['movies', action.sortBy], (category) => (Immutable.fromJS(action.movies)));

        default:
            return state;

    }
}
