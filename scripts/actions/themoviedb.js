import fetchJsonp from 'fetch-jsonp';
import {API_KEY} from '../constants/api-key';

export default function getPopularMovies() {

    fetchJsonp("http://api.themoviedb.org/3/movie/popular?api_key=" + API_KEY, {
        data: 'api_key=8d2ab485b0a9df7358ff91bd52a180fe',
        page: 1,
    })
        .then(response => response.json())
        .then((json) => {
            console.log("getPopularMovies response", json);
        })
        .catch(err => {
            throw err;
        });
}
