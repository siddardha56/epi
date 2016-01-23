import fetchJsonp from 'fetch-jsonp';
import {API_KEY} from '../constants/api-key';
import * as actionTypes from '../constants/action-types';

export default function getPopularMovies() {

    return dispatch => {
        return fetchJsonp("http://api.themoviedb.org/3/movie/popular?api_key=" + API_KEY, {
            data: 'api_key=8d2ab485b0a9df7358ff91bd52a180fe',
            page: 1,
        })
            .then(response => response.json())
            .then((json) => {
                console.log("getPopularMovies response", json);
                return dispatch(updateMovies(json));
            })
            .catch(err => {
                throw err;
            });
    }
}

function updateMovies(json){
    return {
        type: actionTypes.UPDATE_MOVIES,
        movies: json
    };
}
