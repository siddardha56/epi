const initialState = {movies: {}};
import * as actionTypes from '../constants/action-types';

export function rootReducer(state = initialState, action) {
    console.log("root reducer", state, action);
    switch (action.type) {
        case actionTypes.UPDATE_MOVIES:
            return {movies: action.movies};
        default:
            return state;

    }
}
