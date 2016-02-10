import fetchJsonp from 'fetch-jsonp';
import {API_KEY} from '../constants/api-key.ts';
import * as actionTypes from '../constants/action-types.ts';

export function getMovies(sortBy:string, lastUpdated:number = 0) {
    console.log("get Movies");
    return dispatch => {
        if ((new Date()).getTime() - lastUpdated > 300000) {//if data is older than 5 mins
            dispatch(setMoviesState(true));
            return fetchJsonp(`http://api.themoviedb.org/3/movie/${sortBy}?api_key=${API_KEY}`, {
                data: 'api_key=8d2ab485b0a9df7358ff91bd52a180fe',
                page: 1
            })
                .then(response => response.json())
                .then((json) => {
                    dispatch(setMoviesState(false));
                    json.lastUpdated = (new Date()).getTime();
                    return dispatch(setMovies(json, sortBy));
                })
                .catch(err => {
                    //return dispatch(failedToGetMovies(json, sortBy));
                    throw err;
                });
        }
        return null;
    };
}

function setMovies(json, sortBy:string) {
    let actionType = "";
    switch (sortBy) {
        case "popular":
            actionType = actionTypes.SET_MOVIES_POPULAR;
            break;

        case "upcoming":
            actionType = actionTypes.SET_MOVIES_UPCOMING;
            break;

        case "top_rated":
            actionType = actionTypes.SET_MOVIES_TOP_RATED;
            break;

        case "now_playing":
            actionType = actionTypes.SET_MOVIES_NOW_PLAYING;
            break;
    }

    return {
        type: actionType,
        movies: json,
        sortBy: sortBy
    };
}

export function getMovieDetail(id:number){
    console.log("get MovieDetail");
    return dispatch => {
            dispatch(setMoviesState(true));
            return fetchJsonp(`http://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`, {
                data: 'api_key=8d2ab485b0a9df7358ff91bd52a180fe',
                page: 1
            })
                .then(response => response.json())
                .then((json) => {
                    dispatch(setMoviesState(false));
                    return dispatch(setMovieDetail(json));
                })
                .catch(err => {
                    //return dispatch(failedToGetMovies(json, sortBy));
                    throw err;
                });
    };
}

function setMovieDetail(movieDetail){
    return {
        type: actionTypes.SET_MOVIE_DETAIL,
        movieDetail
    };
}

function setMoviesState(isLoading) {
    return {
        type: actionTypes.MOVIES_IS_LOADING,
        isLoading
    };
}

export function getTV(sortBy, lastUpdated = 0) {
    console.log("get TV")
    return dispatch => {
        if ((new Date()).getTime() - lastUpdated > 300000) {//if data is older than 5 mins
            dispatch(setTVState(true));
            return fetchJsonp(`http://api.themoviedb.org/3/tv/${sortBy}?api_key=${API_KEY}`, {
                data: 'api_key=8d2ab485b0a9df7358ff91bd52a180fe',
                page: 1
            })
                .then(response => response.json())
                .then((json) => {
                    dispatch(setTVState(false));
                    json.lastUpdated = (new Date()).getTime();
                    return dispatch(setTV(json, sortBy));
                })
                .catch(err => {
                    //return dispatch(failedToGetMovies(json, sortBy));
                    throw err;
                });
        }
        return null;
    };
}

function setTV(json, sortBy) {
    let actionType = "";
    switch (sortBy) {

        case "on_the_air":
            actionType = actionTypes.SET_TV_ON_THE_AIR;
            break;

        case "airing_today":
            actionType = actionTypes.SET_TV_AIRING_TODAY;
            break;

        case "top_rated":
            actionType = actionTypes.SET_TV_TOP_RATED;
            break;

        case "popular":
            actionType = actionTypes.SET_TV_POPULAR;
            break;
    }

    return {
        type: actionType,
        tv: json,
        sortBy: sortBy
    };
}

function setTVState(isLoading) {
    return {
        type: actionTypes.TV_IS_LOADING,
        isLoading
    };
}