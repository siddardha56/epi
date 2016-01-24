import fetchJsonp from 'fetch-jsonp';
import {API_KEY} from '../constants/api-key';
import * as actionTypes from '../constants/action-types';

export default function getMovies(sortBy) {
    return dispatch => {
        dispatch(setMoviesState(true));
        return fetchJsonp(`http://api.themoviedb.org/3/movie/${sortBy}?api_key=${API_KEY}`, {
            data: 'api_key=8d2ab485b0a9df7358ff91bd52a180fe',
            page: 1,
        })
            .then(response => response.json())
            .then((json) => {
                //console.log("getPopularMovies response", json);
                dispatch(setMoviesState(false));
                return dispatch(setMovies(json, sortBy));
            })
            .catch(err => {
                throw err;
            });
    }
}

function setMovies(json, sortBy) {
    let actionType = "";
    switch (sortBy) {
        case "popular":
            actionType = actionTypes.SET_MOVIES_POPULAR;
            break;

        case "upcoming":
            actionType = actionTypes.SET_MOVIES_UPCOMING;
            break;

        case "top-rated":
            actionType = actionTypes.SET_MOVIES_TOP_RATED;
            break;

        case "now-playing":
            actionType = actionTypes.SET_MOVIES_NOW_PLAYING;
            break;
    }

    return {
        type: actionType,
        movies: json,
        sortBy: sortBy
    };
}

function setMoviesState(isLoading){
    return {
        type: actionTypes.MOVIES_IS_LOADING,
        isLoading
    };
}