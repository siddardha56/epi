import * as actionTypes from '../constants/action-types';
import * as Immutable from 'immutable';

const initialState = Immutable.fromJS({
    movies: {
        //latest: [],
        popular: {page: 0, total_pages: 0, total_results: 0, results: [], lastUpdated: 0},
        "now_playing": {page: 0, total_pages: 0, total_results: 0, results: [], lastUpdated: 0},
        "top_rated": {page: 0, total_pages: 0, total_results: 0, results: [], lastUpdated: 0},
        upcoming: {page: 0, total_pages: 0, total_results: 0, results: [], lastUpdated: 0},
        state: {
            isLoading: false
        }
    },
    tv: {
        //latest: {page: 0, total_pages: 0, total_results: 0, results: [], lastUpdated: 0},
        "on_the_air": {page: 0, total_pages: 0, total_results: 0, results: [], lastUpdated: 0},
        "airing_today": {page: 0, total_pages: 0, total_results: 0, results: [], lastUpdated: 0},
        "top_rated": {page: 0, total_pages: 0, total_results: 0, results: [], lastUpdated: 0},
        "popular": {page: 0, total_pages: 0, total_results: 0, results: [], lastUpdated: 0},
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
            //console.log("state", state.getIn(['movies', action.sortBy]).toJS());
            return state.updateIn(['movies', action.sortBy], (category) => (Immutable.fromJS(action.movies)));

        case actionTypes.TV_IS_LOADING:
            return state.setIn(['tv', 'state', 'isLoading'], action.isLoading);

        case actionTypes.SET_TV_ON_THE_AIR:
        case actionTypes.SET_TV_AIRING_TODAY:
        case actionTypes.SET_TV_TOP_RATED:
        case actionTypes.SET_TV_POPULAR:
            //console.log("state", state.getIn(['tv', action.sortBy]).toJS());
            return state.updateIn(['tv', action.sortBy], (category) => (Immutable.fromJS(action.tv)));

        default:
            return state;

    }
}
